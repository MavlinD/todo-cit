const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')

function resolveAlias(..._path) {
  return path.join(__dirname, ..._path)
}

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .oneOf('pug-vue')
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .options({ basedir: resolveAlias('src') })
      .end()

    config.module
      .rule('eslint')
      .test(/\.(js|vue)$/)
      .use('eslint-loader')
      .options({
        fix: true,
        enforce: 'pre',
        exclude: /node_modules/,
      })
  },
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      alias: {
        src: resolveAlias('src'),
        '@': resolveAlias('src'),
        assets: resolveAlias('src', 'assets'),
        components: resolveAlias('src', 'components'),
      },
    },
    plugins: [
      new StyleLintPlugin({
        files: ['src/**/*.{vue,scss}'],
        fix: true,
        emitWarning: true,
      }),
      new SimpleProgressWebpackPlugin({
        format: 'minimal',
      }),
    ],
  },
  css: {
    sourceMap: true,
  },
}
