const mix = require('laravel-mix');
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

//sass('resources/sass/app.scss', 'public/css')

mix.react('resources/js/main.js', 'public/js')
    .sourceMaps(false, 'eval-cheap-source-map')
    .webpackConfig({
        devServer: {
            contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'resources/devserver')],
            historyApiFallback: true,
            overlay: true,
            proxy: {
                '/api/**': {
                    target: 'http://127.0.0.1:8000/',
                    secure: false,
                    changeOrigin: true,
                }
            }
        },
        resolve: {
            alias: {
                '~': path.resolve(__dirname, 'resources/js'),
                '~c': path.resolve(__dirname, 'resources/js/components'),
                '~p': path.resolve(__dirname, 'resources/js/pages'),
                '~s': path.resolve(__dirname, 'resources/js/store')
            }
        }
    });

