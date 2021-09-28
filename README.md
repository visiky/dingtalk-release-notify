<p align="center">
  <a href="">
    <img width="140" src="https://avatars.githubusercontent.com/u/73879334?s=200&v=4" />
  </a>
</p>

<h1 align="center">DingTalk Release Notify</h1>

![](https://img.shields.io/github/workflow/status/actions-cool/action-js-template/CI?style=flat-square)
[![](https://img.shields.io/badge/marketplace-action--js--template-blueviolet?style=flat-square)](https://github.com/marketplace/actions/action-js-template)
[![](https://img.shields.io/github/v/release/actions-cool/action-js-template?style=flat-square&color=orange)](https://github.com/actions-cool/action-js-template/releases)


## 🎩 Pre-requisites

Create a workflow .yml file in your .github/workflows directory. An example workflow is available below. For more information, reference the GitHub Help Documentation for Creating a workflow file.

## 💡 Inputs introduction

- `DING_TALK_TOKEN`: Webhook token of DingTalk (required). 备注：钉钉机器人的 access_token，在钉钉 im 上 `创建自定义机器人` 即可得到。
- `owner`: The name of the owner of the repo. Used to identify the owner of the repository. Used when cutting releases for external repositories. Default: Current owner
- `repo`: The name of the repository. Used to identify the repository on which to release. Used when cutting releases for external repositories. Default: Current repository
- `notify_title`: Text describing the title of the release. Default: '👏 { repo } { release_tag } Released'
- `notify_body`: Text describing the body of the release. Default: '## { title }    { body }'
- `notify_footer`: Footer text describing of the release. Default: '> 前往 [**{ repo }** { release_tag }]({ release_url }) 查看完整信息.'
- `at_all`: @ all in DingTalk.

## 🚀 Example workflow (how to use?)

**Simple usages:**

```yml
name: DingTalk Release Notify

on:
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: visiky/release-notify@main
        with:
          DING_TALK_TOKEN: ${{ secrets.DING_TALK_ACCESS_TOKEN}}
```

**Advanced usages:**

```yml
name: DingTalk Release Notify

on:
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ./
        with:
          DING_TALK_TOKEN: ${{ secrets.DING_TALK_ACCESS_TOKEN}}
          notify_title: '🎉 DingTalk Release Notify 发布 release {release_tag} 🎉' # Template of nofify title message in DingTalk
          notify_body: '## { title }<hr /> ![](https://gw.alipayobjects.com/zos/antfincdn/pJ5JP3Ntkd/2021-08.png) <hr /> { body } <hr />' # Template of nofify body message in DingTalk
          notify_footer: '> 前往 [**G2Plot**]({ release_url }) 查看完整信息.' # Template of nofify footer message in DingTalk
          at_all: false # whether to ding everybody

```


## LICENSE

[MIT](./LICENSE)
