const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const NODE_ENV = process.env.NODE_ENV.trim()
const isDevMode = NODE_ENV === 'development' ? true : false

module.exports = {
    mode: isDevMode ? 'development' : 'production',
    entry: {
        'main': path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].[chunkhash:8].js',
        clean: true,
    },
    resolve: {
        alias: {
            '@': path.resolve('./src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',] // vue-style-loader 就不需要 style-loader
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: 'asset',
                generator: {
                    // 输出文件位置以及文件名
                    // [ext] 自带 "." 这个与 url-loader 配置不同
                    filename: "assets/images/[name].[hash:8][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 50 * 1024 //超过50kb不转 base64
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                type: 'asset',
                generator: {
                    // 输出文件位置以及文件名
                    filename: "assets/fonts/[name].[hash:8][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 超过100kb不转 base64
                    }
                }
            },
        ]
    },
    // optimization: {
    //     splitChunks: {

    //     }
    // },
    devtool: isDevMode ? "eval-cheap-source-map" : 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            favicon: path.resolve(__dirname, './src/assets/images/favicon.ico')
        }),
        new VueLoaderPlugin(),
        // new BundleAnalyzerPlugin(), // 代码打包分析大小
        new MiniCssExtractPlugin(),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, './src/assets')
        },
        compress: true,
        port: 1118,
    }
}