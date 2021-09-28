/**
 * 简单的模板引擎，使用方式如下（空格自动忽略）：
 * template('hello, {name}', { name: 'AntV' }); // hello, AntV
 * @param string
 * @param object {data} options
 */
export function template(source, data) {
  if (!data) {
    return source;
  }
  let result = source;
  Object.keys(data).forEach(k => {
    const v = data[k];
    result = result.replace(new RegExp(`{\\s*${k}\\s*}`, 'g'), v);
  });

  return result;
}
