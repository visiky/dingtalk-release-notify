const PULL_PATTERN = repo => `https://github.com/${repo}/pull/([\\d]+)`;
const COMPARE_PATTERN = repo => `https://github.com/${repo}/(compare|commits)/([\\d\.]+)`;

/**
 * 简单的模板引擎，使用方式如下（空格自动忽略）：
 * template('hello, {name}', { name: 'AntV' }); // hello, AntV
 * @param string
 * @param object {data} options
 * @param string {repository}
 */
export function template(source, data, repository) {
  function reduceGithubUrl(str) {
    if (repository) {
      const urls = str.match(new RegExp(`https://github.com/${repository}/(\\w*)/([\\d\.]*)`, 'g'));
      if (urls) {
        urls.forEach(url => {
          let parsed = url.match(PULL_PATTERN(repository));
          let hash = parsed && parsed[1];
          if (!hash) {
            parsed = utl.match(COMPARE_PATTERN(repository));
            hash = parsed && parsed[2];
          }
          if (hash) {
            str = str.replace(new RegExp(url, 'g'), `[#${hash}](${url})`);
          }
        });
      }
    }
    return str;
  }
  if (!data) {
    return reduceGithubUrl(source);
  }
  let result = source;
  Object.keys(data).forEach(k => {
    const v = data[k];
    result = result.replace(new RegExp(`{\\s*${k}\\s*}`, 'g'), v);
  });

  return reduceGithubUrl(result);
}
