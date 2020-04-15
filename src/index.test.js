import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  })
})
describe('index.html', () => {
  it('should say hello', (done) => { // with asyn call should have done

    let index = readFileSync('./src/index.html', { encoding: "utf-8" });
    const dom = new JSDOM(index);
    const h1 = dom.window.document.getElementsByTagName('h1')[0];
    expect(h1.innerHTML).to.equal('Hello World!');
    done();
  })
})
