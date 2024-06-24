const {normalizeURL} = require('./crawl.js')

const {getURLSfromHTML} = require('./crawl.js')

const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('normalizeURL strip trailing slash', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL lowercase', ()=>{
    const input = 'https://blog.BOOT.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})



test('getURLSfromHTML absolute', ()=>{
    const inputHTMLBODY = `
    <html>
    <body>
    <a href="http://chillfill.us">fill</a>
    </body>
    </html>
    `
    const inputBaseURL = "http://chillfill.us";
    const actual = getURLSfromHTML(inputHTMLBODY,inputBaseURL);
    const expected = ['http://chillfill.us/']
    expect(actual).toEqual(expected)
})

test('getURLSfromHTML relative', ()=>{
    const inputHTMLBODY = `
    <html>
    <body>
    <a href="/path/">fill</a>
    </body>
    </html>
    `
    const inputBaseURL = "http://chillfill.us";
    const actual = getURLSfromHTML(inputHTMLBODY,inputBaseURL);
    const expected = ['http://chillfill.us/path/']
    expect(actual).toEqual(expected)
})

test('getURLSfromHTML multi', ()=>{
    const inputHTMLBODY = `
    <html>
    <body>
    <a href="/path/">fill</a>
    <a href="https://google.com/path/">fill</a>
    </body>
    </html>
    `
    const inputBaseURL = "http://chillfill.us";
    const actual = getURLSfromHTML(inputHTMLBODY,inputBaseURL);
    const expected = ['http://chillfill.us/path/','https://google.com/path/']
    expect(actual).toEqual(expected)
})


test('getURLSfromHTML invalid', ()=>{
    const inputHTMLBODY = `
    <html>
    <body>
    <a href="invalid">fill</a>
    <a href="https://google.com/path/">fill</a>
    </body>
    </html>
    `
    const inputBaseURL = "http://chillfill.us";
    const actual = getURLSfromHTML(inputHTMLBODY,inputBaseURL);
    const expected = ['https://google.com/path/']
    expect(actual).toEqual(expected)
})