const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// 1、去除ddm插件的前缀
const pluginName = pkg.name.replace(/^ddm-plugin-/, ''); // 去掉插件前缀

const keywords = new Set();

// 2、为每个单词生成所有子串
for (let i = 0; i < pluginName.length; i++) {
    for (let j = i + 1; j <= pluginName.length; j++) {
        keywords.add(pluginName.substring(i, j));
    }
}


// 3、 保留原有 keywords，追加新关键词（去重）
const originalKeywords = Array.isArray(pkg.keywords) ? pkg.keywords : [];
const combinedKeywords = [...originalKeywords];

for (const kw of Array.from(keywords).sort()) {
    if (!combinedKeywords.includes(kw)) {
        combinedKeywords.push(kw);
    }
}

// 4、如果关键字有变更，重新写入
if (combinedKeywords.length !== originalKeywords.length) {
    pkg.keywords = combinedKeywords;
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
    console.log(`[INFO] 已更新 keywords`);
}