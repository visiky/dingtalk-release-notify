const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');
const DingRobot = require('ding-robot');

async function run() {
  try {
    // const ms = core.getInput('milliseconds');
    // core.debug(`Waiting ${ms} milliseconds ...`); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    // core.debug(new Date().toTimeString());
    // await new Promise(resolve => {
    //   setTimeout(() => resolve('done!'), 10);
    // });
    // core.debug(new Date().toTimeString());

    // core.setOutput('time', new Date().toTimeString());

    const context = github.context;
    const pr = context.payload.pull_request;
    const dingTalkToken = core.getInput('DING_TALK_TOKEN');
    const extraContent = core.getInput('extra_content') || '';
    const repoUrl = core.getInput('repo_url');
    // 默认开启: at 所有人
    const atAll = core.getInput('at_all') || true;

    if (!dingTalkToken) {
      core.setFailed('Please set DingTalk access token!');
    }

    const robot = new DingRobot(dingTalkToken, error => {
      if (error) {
        core.setFailed(error.message);
      }
    });



    const prLink = repoUrl ? `${repoUrl}/${pr.number}` : pr.html_url;
    const content = `👏 ${context.repo} Release. \n ${JSON.stringify(context)}`;
    robot.atAll(atAll).text(content);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
