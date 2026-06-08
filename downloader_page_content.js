// Download the content of a wikipedia article
import puppeteer from 'puppeteer';

// launch the browser
const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto('https://en.wikipedia.org/wiki/Gender_symbol');

// Get article title
const title = await page.locator('#firstHeading').waitHandle();
const fullTitle = await title?.evaluate(el => el.innerHTML);

console.log(fullTitle);

// slice on url without the domain
console.log(fullTitle.slice(0,2))

// get the content
const content = await page.locator('#bodyContent').waitHandle();
const fullContent = await content?.evaluate(el => el.innerHTML);

// TODO : replace all theses divs by blank
// ! mw-editsection

console.log(fullContent.replace(/<!--(?s:.)*?-->/gm, ''));

await browser.close();