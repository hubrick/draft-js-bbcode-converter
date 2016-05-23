const {describe, it} = global;
import expect from 'expect';
import stateToBBCode from '../bbcode-export.js';
import {convertFromRaw, ContentState} from 'draft-js';

describe('stateToBBCode', () => {
    const bbcode = '[p]Hello [b]world[/b][/p]';

    it('should create content state', () => {
        const blockArray = {
            "entityMap": {},
            "blocks": [{
                "key": "79pdo",
                "text": "Hello world",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [{
                    "offset": 6,
                    "length": 5,
                    "style": "BOLD"
                }],
                "entityRanges": []
            }]
        };

        const contentState = convertFromRaw(blockArray);
        const result = stateToBBCode(contentState);

        expect(result).toEqual(bbcode);
    });
});