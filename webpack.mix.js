const mix = require('laravel-mix');
const sass = require('sass');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


mix.js('resources/src/main.js', 'public').js('resources/src/login.js', 'public')
    .vue();

    mix.webpackConfig({
        output: {
          
            filename:'js/[name].min.js',
            chunkFilename: 'js/bundle/[name].[hash].js',
          },
        plugins: [
            new MomentLocalesPlugin(),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['./js/*']
              }),
        ]
    });

mix.override((config) => {
    config.module.rules.forEach((rule) => {
        if (!rule.test || !rule.test.toString().includes('scss')) return;
        const uses = rule.use || (rule.loader ? [{ loader: rule.loader, options: rule.options }] : []);
        uses.forEach((entry) => {
            if (entry && typeof entry === 'object' && entry.loader && entry.loader.includes('sass-loader')) {
                entry.options = Object.assign({}, entry.options, { implementation: sass });
            }
        });
    });
});