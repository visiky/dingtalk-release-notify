/**
 * 简单的模板引擎，使用方式如下（空格自动忽略）：
 * template('hello, {name}', { name: 'AntV' }); // hello, AntV
 * @param string
 * @param object {data} options
 * @param string {repository}
 */
export function template(source, data, repository) {
  function reduceGithubUrl(str) {
    // 把 github 链接，进行缩写. 如: https://github.com/antvis/G2/pull/3794 -> [#3794](https://github.com/antvis/G2/pull/3794)
    if (repository) {
      const urls = str.match(
        new RegExp(`https://github.com/${repository}/(\\w*)/([\\d]*)`, 'g'),
      );
      if (urls) {
        urls.forEach(url => {
          const id = url.match(/.*\/(\d*)/)[1];
          str = str.replace(new RegExp(url, 'g'), `[#${id}](${url})`);
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
