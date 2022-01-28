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
          const id = url.match(/.*\/([\d.]*)/)[1];
          // 把 github 链接，进行缩写. 如: https://github.com/antvis/G2/compare/0.1.2...v0.1.5 -> [0.1.2...v0.1.5](https://github.com/antvis/G2/compare/0.1.2...v0.1.5)
          // str = str.replace(new RegExp(url, 'g'), id.match(/[^\d]/) ? `[${id}](${url})` : `[#${id}](${url})`);
          if (id.match(/[^\d]/)) {
            str = str.replace(new RegExp(url, 'g'), `[${id}](${url})`);
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
