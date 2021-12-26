const { override, fixBabelImports,addWebpackAlias,addLessLoader } = require('customize-cra');
const { resolve } = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
   }),
   addWebpackAlias({
    ['@']:resolve(__dirname,"./src"),
    ["views"]:resolve(__dirname,"./src/views"),
    ["component"]:resolve(__dirname,"./src/component"),
    ["network"]:resolve(__dirname,"./src/network"),
    ["assets"]:resolve(__dirname,"./src/assets"),
    ["jjccredux"]:resolve(__dirname,"./src/jjccredux"),
    ["hoc"]:resolve(__dirname,"./src/component/common/hoc"),
    ["hooks"]:resolve(__dirname,"./src/component/common/hooks"),
    ["routes"]:resolve(__dirname,"./src/routes")
  }),
  addLessLoader({
    lessOptions: {
      strictMath: true,
      noIeCompat: true,
      loader: "css-loader",
      modules: {
        localIdentName: "[name]__[local]___[hash:base64:5]",
      }
    }
  })
);




