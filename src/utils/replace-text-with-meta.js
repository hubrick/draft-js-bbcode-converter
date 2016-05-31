/*
    From https://github.com/sstur/draft-js-import-element
    Props to the original author
 */

import {IndexedSeq} from 'immutable';

function repeatSeq (seq, count) {
    let result = seq.slice(0, 0);
    while (count-- > 0) {
        result = result.concat(seq);
    }
    return result;
}

export default function replaceTextWithMeta (subject, searchText, replaceText) {
    let {text, characterMeta} = subject;
    let searchTextLength = searchText.length;
    let replaceTextLength = replaceText.length;
    let resultTextParts = [];
    // Get empty set of same kind as characterMeta.
    let resultCharMeta = characterMeta.slice(0, 0);
    let lastEndIndex = 0;
    let index = text.indexOf(searchText);
    while (index !== -1) {
      resultTextParts.push(
            text.slice(lastEndIndex, index) + replaceText,
        );
        resultCharMeta = resultCharMeta.concat(
            characterMeta.slice(lastEndIndex, index),
            // Use the metadata of the first char we are replacing.
            repeatSeq(characterMeta.slice(index, index + 1), replaceTextLength),
        );
        lastEndIndex = index + searchTextLength;
        index = text.indexOf(searchText, lastEndIndex);
    }
    resultTextParts.push(
        text.slice(lastEndIndex),
    );
    resultCharMeta = resultCharMeta.concat(
        characterMeta.slice(lastEndIndex),
    );
    return {text: resultTextParts.join(''), characterMeta: resultCharMeta};
}