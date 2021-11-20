const { override, fixBabelImports,addWebpackAlias } = require('customize-cra');
const { resolve } = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
   }),
   addWebpackAlias({
    ['@']:resolve("src"),
    ["views"]:resolve("src/views"),
    ["component"]:resolve("src/component"),
    ["network"]:resolve("src/network"),
    ["assets"]:resolve("src/assets"),
    ["jjccredux"]:resolve("src/jjccredux"),
    ["hoc"]:resolve("src/component/common/hoc"),
    ["hooks"]:resolve("src/component/common/hooks"),
    ["routes"]:resolve("src/routes")
  })
);




