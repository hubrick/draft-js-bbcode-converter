import BBCodeParser from 'bbcode-parser';
import BBTag from 'bbcode-parser/bbTag';
import {stateFromHTML} from 'draft-js-import-html';

export default function BBCodeToState (bbcode = '', customTags = {}) {
    let bbTags = BBCodeParser.defaultTags();

    Object.assign(bbTags, {
        h1: BBTag.createSimpleTag('h1'),
        h2: BBTag.createSimpleTag('h1'),
        h3: BBTag.createSimpleTag('h1'),
        p: BBTag.createSimpleTag('p'),
        quote: BBTag.createSimpleTag('quote'),
        ul: BBTag.createSimpleTag('ul'),
        li: BBTag.createSimpleTag('li'),
        img: BBTag.createTag('img', function (tag, content, attr) {
            return `<figure><img src="${content}"/></figure>`;
        })
    }, customTags);

    const parser = new BBCodeParser(bbTags);
    const html = parser.parseString(bbcode);

    return stateFromHTML(html);
}