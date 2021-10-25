const core = require('@actions/core');
const github = require('@actions/github');
const DingRobot = require('ding-robot');
const { template: parseTemplate } = require('./util');

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
    // 默认: ding 所有人
    const atAll = core.getInput('at_all') || true;

    const octokit = github.getOctokit(myToken);

    const response = await octokit.rest.repos.getLatestRelease({
      owner,
      repo,
    });
    if (response && response.data) {
      const { tag_name, prerelease, draft, html_url, body } = response.data;

      if (!prerelease && !draft) {
        const titleTemplate = core.getInput('notify_title');
        const bodyTemplate = core.getInput('notify_body');
        const footerTemplate = core.getInput('notify_footer');
        const repo = core.getInput('repo') || currentRepo;

        const title = parseTemplate(titleTemplate, { repo, release_tag: tag_name });
        const bodyText = parseTemplate(bodyTemplate, { title, body }) || '';
        const footer =
          parseTemplate(footerTemplate, { repo, release_tag: tag_name, release_url: html_url }) ||
          '';

        dingTalkTokens.split('\n').forEach(dingTalkToken => {
          const robot = new DingRobot(dingTalkToken, error => {
            if (error) {
              core.setFailed(error.message);
            }
          });
          robot.atAll(atAll).markdown(title, `${bodyText}\n\n${footer}`);
        });
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
