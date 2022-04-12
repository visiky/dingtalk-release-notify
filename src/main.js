const core = require('@actions/core');
const github = require('@actions/github');
const DingRobot = require('ding-robot');
const { template: parseTemplate } = require('./util');

function sendReleaseNotice(params) {
  const { responseData, currentRepo, currentOwner, dingTalkTokens, atAll, enablePrerelease } =
    params;
  if (!responseData) {
    return;
  }
  const { tag_name, prerelease, draft, html_url, body } = responseData;

  if (draft) {
    return;
  }

  if (prerelease && !enablePrerelease) {
    return;
  }

  const titleTemplate = core.getInput('notify_title');
  const bodyTemplate = core.getInput('notify_body');
  const footerTemplate = core.getInput('notify_footer');
  const repo = core.getInput('repo') || currentRepo;
  const owner = core.getInput('owner') || currentOwner;

  const title = parseTemplate(titleTemplate, {
    repo,
    release_tag: tag_name,
  });
  const bodyText = parseTemplate(bodyTemplate, { title, body }, `${owner}/${repo}`) || '';
  const footer =
    parseTemplate(
      footerTemplate,
      {
        repo,
        release_tag: tag_name,
        release_url: html_url,
      }) || '';

  const tokens = dingTalkTokens.split('\n');
  tokens.forEach(dingTalkToken => {
    const robot = new DingRobot(dingTalkToken, error => {
      if (error) {
        core.setFailed(error.message);
      }
    });
    robot.atAll(atAll).markdown(title, `${bodyText}\n\n${footer}`);
  });
  if (!tokens.length) {
    const robot = new DingRobot(dingTalkTokens, error => {
      if (error) {
        core.setFailed(error.message);
      }
    });
    robot.atAll(atAll).markdown(title, `${bodyText}\n\n${footer}`);
  }
}

async function run() {
  try {
    const myToken = core.getInput('GITHUB_TOKEN');
    const dingTalkTokens = core.getInput('DING_TALK_TOKEN');
    if (!dingTalkTokens) {
      core.setFailed('Please set DingTalk access token!');
    }

    const { owner: currentOwner, repo: currentRepo } = github.context.repo;

    const owner = core.getInput('owner') || currentOwner;
    const repo = core.getInput('repo') || currentRepo;
    // 默认: @所有人
    const atAll = core.getInput('at_all') || true;
    const enablePrerelease = core.getInput('enable_prerelease') || false;

    const octokit = github.getOctokit(myToken);

    if (enablePrerelease) {
      const releasesResponse = await octokit.request('GET /repos/{owner}/{repo}/releases', {
        owner,
        repo,
      });
      // 接口返回的 release 是有顺序的, 在前面的就是最新的, 取第一个即可, 如果没有pre release, 就用正式的
      const latestPreReleaseData =
        (releasesResponse.data || []).find(item => item.prerelease) || releasesResponse.data[0];

      sendReleaseNotice({
        responseData: latestPreReleaseData,
        currentOwner,
        currentRepo,
        dingTalkTokens,
        atAll,
        enablePrerelease,
      });
      return;
    }

    const response = await octokit.rest.repos.getLatestRelease({
      owner,
      repo,
    });

    sendReleaseNotice({
      responseData: response.data,
      currentOwner,
      currentRepo,
      dingTalkTokens,
      atAll,
      enablePrerelease,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
