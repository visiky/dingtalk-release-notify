<h1 align="center">DingTalk Release Notify</h1>

![](https://img.shields.io/github/workflow/status/visiky/dingtalk-release-notify/CI?style=flat-square)
[![](https://img.shields.io/badge/marketplace-dingtalk--release--notify-blueviolet?style=flat-square)](https://github.com/marketplace/actions/dingtalk-release-notify)
[![](https://img.shields.io/github/v/release/visiky/dingtalk-release-notify?style=flat-square&color=orange)](https://github.com/visiky/dingtalk-release-notify/releases)


## ð© Pre-requisites

Create a workflow .yml file in your .github/workflows directory. An example workflow is available below. For more information, reference the GitHub Help Documentation for Creating a workflow file.

## ð¡ Inputs introduction

- `DING_TALK_TOKEN`: Webhook token of DingTalk (required). å¤æ³¨ï¼ééæºå¨äººç access_tokenï¼å¨éé im ä¸ `åå»ºèªå®ä¹æºå¨äºº` å³å¯å¾å°ï¼æ¯æå¤ä¸ª DingTalk Tokenï¼ç¨æ¢è¡ç¬¦åéã
- `owner`: The name of the owner of the repo. Used to identify the owner of the repository. Used when cutting releases for external repositories. Default: Current owner
- `repo`: The name of the repository. Used to identify the repository on which to release. Used when cutting releases for external repositories. Default: Current repository
- `notify_title`: Text describing the title of the release. Default: 'ð { repo } { release_tag } Released'
- `notify_body`: Text describing the body of the release. Default: '## { title }    { body }'
- `notify_footer`: Footer text describing of the release. Default: '> åå¾ [**{ repo }** { release_tag }]({ release_url }) æ¥çå®æ´ä¿¡æ¯.'
- `at_all`: @ all in DingTalk.
- `enable_prerelease`: use prerelease notes content

## ð Example workflow (how to use?)

**Simple usages:**

```yml
name: DingTalk Release Notify

on:
  workflow_dispatch: # manual trigger workflow to nofify dingTalk
  release:
    types: [published, edited]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: visiky/dingtalk-release-notify@main
        with:
          DING_TALK_TOKEN: ${{ secrets.DING_TALK_ACCESS_TOKEN}}
```

**Advanced usages:**

```yml
name: DingTalk Release Notify

on:
  workflow_dispatch: # manual trigger workflow to nofify dingTalk
  release:
    types: [published, edited]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: visiky/dingtalk-release-notify@main
        with:
          DING_TALK_TOKEN: ${{ secrets.DING_TALK_ACCESS_TOKEN }}
          notify_title: 'ð DingTalk Release Notify åå¸ release {release_tag} ð' # Template of nofify title message in DingTalk
          notify_body: '## { title }<hr /> ![](https://gw.alipayobjects.com/zos/antfincdn/pJ5JP3Ntkd/2021-08.png) <hr /> { body } <hr />' # Template of nofify body message in DingTalk
          notify_footer: '> åå¾ [**G2Plot**]({ release_url }) æ¥çå®æ´ä¿¡æ¯.' # Template of nofify footer message in DingTalk
          at_all: false # whether to ding everybody

```

**Prerelease usages:**

```yml
name: DingTalk Release Notify

on:
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: visiky/dingtalk-release-notify@main
        with:
          DING_TALK_TOKEN: ${{ secrets.DING_TALK_ACCESS_TOKEN}}
          enable_prerelease: true
          
```

## Preview

<img src="https://gw.alipayobjects.com/zos/antfincdn/xJjThPInXV/notify.png" alt="preview" width="400" />

## LICENSE

[MIT](./LICENSE)
