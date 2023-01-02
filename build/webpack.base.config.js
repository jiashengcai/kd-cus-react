const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const FileManagerPlugin  = require("filemanager-webpack-plugin");
// const ZipPlugin = require('zip-webpack-plugin');

const multipe = require('./entry.config.js')
const customConfigInfo = require('./custom.configInfo.js')

const client = customConfigInfo.client  // PC端或者移动端
const isv = customConfigInfo.isv    // 开发商标识
const moduleId = customConfigInfo.moduleId  // 领域标识

const rootPath =  path.join(__dirname, '../')
const getEntrys = multipe.getEntrys

// 控件目录
const ctrlPath = `./src/${client}/isv/${isv}/${moduleId}`
//根据具体目录结构来确定路径
const entryPattern = `${ctrlPath}/**/main.js`;

module.exports = {
    entry: getEntrys(entryPattern),
    output:{
        filename: '[name]/index.js',
        path: path.join(rootPath, `/src/web/isv/${isv}/${moduleId}`)
    },
    module:{
        rules:[{
            test: /\.js$/,
            exclude: /node_modules(?!(\/|\\)pdfjs-dist)/,
            loader: 'babel-loader',
            options: {
                'presets': ['@babel/preset-env'],
                'plugins': ['@babel/plugin-proposal-optional-chaining']
            }
        }
        ,{
            test:/\.jsx?$/,
            loaders:['babel-loader']
        },{
            test:/\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/,
            loader: 'url-loader?limit=1024&name=[path][name].[ext]'
        },{
            test:/\.(css|less)$/,
            loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                      sourceMap: true,
                      importLoaders: true,
                      modules: true
                    }
                },'less-loader']
            })
        }]
    },
    plugins:[
        new ExtractTextPlugin({
            filename: '[name]/css/index.css',
            disable: false,
            allChunks: true
        }),
        // new FileManagerPlugin({
        //     onEnd: {
        //         archive: [
        //             {
        //                 source: `./src/web/isv/${isv}/${moduleId}/stepsvue`,
        //                 destination: `./src/web/isv/${isv}/${moduleId}/stepsvue/stepsvue-[hash].zip`
        //             }
        //         ]
        //     }
        // }),
        // new ZipPlugin({
        // }),
    ]
}