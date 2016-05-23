# DraftJS: Convert to and from BBCode

This is a module for [DraftJS](https://github.com/facebook/draft-js) that will convert BBCode to editor content and back.

## How to use


```
import converter from 'draft-js-bbcode-converter';

// import from bbcode
const contentState = converter.bbcodeImport('[p]Hello [b]world[/b][/p]')

// export to bbcode
const contentState = editorState.getCurrentContent();
const bbcodeString = converter.bbcodeExport(contentState);

```