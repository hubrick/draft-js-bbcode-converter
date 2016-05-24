const {describe, it} = global;
import expect from 'expect';
import stateToBBCode from '../bbcode-export.js';
import {convertFromRaw, ContentState} from 'draft-js';

describe('stateToBBCode', () => {
    const bbcode = '[p]Hello [b]world[/b][url="http://google.de"]Google[/url][/p]';

    it('should create content state', () => {
        const blockArray = {
            "entityMap": {
                '0': {
                    type: 'LINK',
                    mutability: 'MUTABLE',
                    data: {
                        url: 'http://google.de'
                    }
                }
            },
            "blocks": [{
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
            }]
        };

        const contentState = convertFromRaw(blockArray);
        const result = stateToBBCode(contentState);

        expect(result).toEqual(bbcode);
    });
});