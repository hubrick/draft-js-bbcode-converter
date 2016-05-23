const {describe, it} = global;
import expect from 'expect';
import stateFromBBCode from '../bbcode-import.js';
import {convertToRaw} from 'draft-js';

describe('stateFromBBCode', () => {
    const bbcode = '[p]Hello [b]world[/b][/p]';

    it('should create content state', () => {
        const contentState = stateFromBBCode(bbcode);
        const rawContentState = convertToRaw(contentState);
        const blocks = removeKeys(rawContentState.blocks);

        expect(blocks).toEqual(
             [{
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
        );
    });
});

function removeKeys(blocks) {
    return blocks.map((block) => {
        let {key, ...other} = block; // eslint-disable-line no-unused-vars
        return other;
    });
}