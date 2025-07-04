const webpack = require('webpack');
const path = require('path');
const glob = require("glob");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const version = require("./config/version.json");
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = function (env, argv) {
    /*
     * boolean variable for development mode
     */
    const devMode = argv.mode === 'development';

    let mods = {
        watch: devMode,
        devtool: devMode ? 'source-map' : 'cheap-module-source-map',
        entry: {
            app: ['./src/js/app.js', './src/scss/app.scss'],
            // admin: ['./src/scss/wp-admin.scss'],
            // page_not_found: ['./src/scss/pages/page_not_found.scss'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `js/[name]-${version.version}.min.js`,
        },
        module: {
            rules: [
                /*
                 * Handle ES6 transpilation
                 */
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-syntax-dynamic-import']
                        }
                    },
                },
                /*
                 * Handle SCSS transpilation
                 */
                {
                    test: /.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                url: false,
                            },
                        },
                        "postcss-loader",
                        'css-unicode-loader', // Convert double-byte character to unicode encoding.
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][hash][ext][query]'
                    }
                },
            ],
        },
        plugins: [
            new RemoveEmptyScriptsPlugin(),
            /*
             * Automatically load jquery instead of having to import it everywhere
             */
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            }),
            /*
             * Extract app CSS and npm package CSS into two separate files
             */
            new MiniCssExtractPlugin({
                filename: 'css/[name].min.css',
            }),


            new CleanWebpackPlugin(),
            // Copy images to the public folder
            // new CopyPlugin({
            //     patterns: [
            //         {
            //             from: "assets/images",
            //             to: "images",
            //         }
            //     ]
            // }),

        ],
        // Configure the "webpack-dev-server" plugin
        devServer: {
            static: {
                directory: path.resolve(process.cwd(), "dist")
            },
            watchFiles: [
                path.resolve(process.cwd(), "index.php")
            ],
            compress: true,
            port: process.env.PORT || 9090,
            hot: true,
        },
    };
    /*
     * Minimize CSS if not devMode
     */
    if (!devMode) {
        mods = {
            ...mods,
            plugins: [
                ...mods.plugins,

                new CompressionPlugin() //GZ compression
            ],
            optimization: {
                minimize: true,
                minimizer: [
                    new TerserPlugin(),
                    new CssMinimizerPlugin()
                ],
                concatenateModules: true,
            }
        }
    };
    // Performance configuration
    performance: {
        hints: true
    };

    return mods;
};
