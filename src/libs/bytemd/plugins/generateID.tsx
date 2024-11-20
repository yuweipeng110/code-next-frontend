import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

export const generateID = (tree: any) => {
    let index = 0;
    let tagNameList = ["h2", "h3", "h4", "h5", "h6"];
    visit(tree, 'element', (node: any) => {
        if (tagNameList.indexOf(node.tagName) >= 0) {
            // 提取 heading 的文本
            const textContent = toString(node);
            // console.log('textContent', tree, index);
            const dataId = `heading-${index}`;
            // 将生成的 id 赋值给 heading 节点
            // node.properties.id = textContent;
            node.properties.id = dataId;
            node.properties.dataid = dataId;
            index++;
        }
    });
};