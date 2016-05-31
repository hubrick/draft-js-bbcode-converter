import BBCodeParser from 'bbcode-parser';
import BBTag from 'bbcode-parser/bbTag';
import stateFromElement from './utils/state-from-element.js';

function getElement (html) {
    let doc;
    if (typeof DOMParser !== 'undefined') {
        let parser = new DOMParser();
        doc = parser.parseFromString(html, 'text/html');
    } else {
        doc = document.implementation.createHTMLDocument('');
        doc.documentElement.innerHTML = html;
    }
    return doc.body;
}

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
            const caption = attr['img-caption'] ? `<figcaption>${attr['img-caption']}</figcaption>` : '';
            return `<figure><img src="${content}"/>${caption}</figure>`;
        })
    }, customTags);

    const parser = new BBCodeParser(bbTags);
    const htmlString = parser.parseString(bbcode);
    return stateFromElement(getElement(htmlString));
}