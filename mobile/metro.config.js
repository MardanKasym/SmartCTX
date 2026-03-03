const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Exclude parent node_modules to avoid EMFILE errors
config.watchFolders = [path.resolve(__dirname)];
config.resolver.blockList = [
    /\.\.\/node_modules\/.*/,
    /\.\.\/src\/.*/,
    /\.\.\/\.git\/.*/,
];

module.exports = config;
