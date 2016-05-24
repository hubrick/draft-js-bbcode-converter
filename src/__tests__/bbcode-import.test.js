const {describe, it} = global;
import expect from 'expect';
import stateFromBBCode from '../bbcode-import.js';
import {convertToRaw} from 'draft-js';

describe('stateFromBBCode', () => {
    const bbcode = '[p]Hello [b]world[/b][url="http://google.de"]Google[/url][/p][p][img]http://image-url.com[/img][/p]';

    it('should create content state', () => {
        const contentState = stateFromBBCode(bbcode);
        const rawContentState = convertToRaw(contentState);
        const blocks = removeKeys(rawContentState.blocks);
        const entityMap = rawContentState.entityMap;

        expect(entityMap).toEqual(
            {
                '0': {
                    type: 'LINK',
                    mutability: 'MUTABLE',
                    data: {
                        target: '_blank',
                        url: 'http://google.de'
                    }
                },
                '1': {
                    type: 'IMAGE',
                    mutability: 'MUTABLE',
                    data: {
                        src: 'http://image-url.com'
                    }
                }
            }
        );

        expect(blocks).toEqual(
             [{
                "text": "Hello worldGoogle",
                "type": "unstyled",
                "depth": 0,
                "entityRanges": [
                    {
                        "key": 0,
                        "length": 6,
                        "offset": 11
                    }
                ],
                "inlineStyleRanges": [{
                    "offset": 6,
                    "length": 5,
                    "style": "BOLD"
                }]
            },
            {
                "depth": 0,
                "entityRanges": [
                    {
                        "key": 1,
                        "length": 1,
                        "offset": 0
                    }
                ],
                "inlineStyleRanges": [],
                "text": "~",
                "type": "unstyled"
            }]
        );
    });
});

function removeKeys(blocks) {
    return blocks.map((block) => {
        let {key, ...other} = block; // eslint-disable-line no-unused-vars
        return other;
    });
}