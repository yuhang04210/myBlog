const fs = require("fs");
const path = require("path");

/**
 * 获取一个目录下的所有文件名
 * 使用方法：var filehelper = require('./getFilenames.js')
 * filehelper.getFileName("/Users/fangzheng/JavaDev/blog/docs/BigData/Flume/")
 */
const getFileName = rpath => {
    let filenames = [];
    fs.readdirSync(rpath).forEach(file => {
        fullpath = rpath + "/" + file;
        var fileinfo = fs.statSync(fullpath);
        if (fileinfo.isFile()) {
            if (file === "README.md") {
                file = "";
            } else {
                file = file.replace(".md", "");
            }
            filenames.push(file);
        }
    });
    // console.log(filenames)
    filenames.sort(); // 排序
    return filenames;
};

/**
 * 为文件添加前缀
 * @param {*} path 需要拼接的前缀
 * @param {*} array 路径数组
 */
const pathJoin = (path, array) => {
    let result = [];
    if (array.length > 0) {
        result = array.map(item => {
            return path + item;
        });
    }
    return result;
};

// 遍历获取目录下的所有文件夹名字
const readDirName = () => {
    const basePath = path.join(__dirname, "../docs");
    let pathName = [];

    const files = fs.readdirSync(basePath);
    for (let i = 0; i < files.length; i++) {
        var filename = files[i];
        let stats = fs.statSync(basePath + "/" + filename);
        let flag = false;
        let regex = /^\./;
        flag = regex.test(filename);
        if (stats.isDirectory() && !flag) {
            console.log("path", pathName);
            console.log("filename", filename);
            pathName.push(filename);
        }
    }

    return pathName;
};

// 获取侧边栏菜单
const getSidebar = () => {
    let sliderbars = [];
    const dirNames = readDirName();
    sliderbars = dirNames.map(item => {
        let obj = {
            collapsable: true
        };
        let fileNames = getFileName(path.join(__dirname, "../docs/" + item));
        let paths = pathJoin("../" + item + "/", fileNames);
        obj.title = item;
        obj.children = paths;
        return obj;
    });

    return sliderbars;
};

module.exports = {
    getFileName,
    pathJoin,
    readDirName,
    getSidebar
};
