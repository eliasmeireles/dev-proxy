const fs = require('fs');
const yaml = require('js-yaml');

const loadYamlConfig = (filePath) => {
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return yaml.load(fileContents).redirect.map(source => {
            return {
                hostTarget: source.hostTarget,
                basePath: source.basePath,
                pathRewrite: source.pathRewrite !== null ? source.pathRewrite : [],
                openPaths: source.openPaths !== null ? source.openPaths : []
            }
        })
    } catch (error) {
        console.error(`Error reading YAML file: ${filePath}\n${error}`);
        return null;
    }
};


module.exports = {loadYamlConfig}
