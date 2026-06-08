// scrap all urls in the all pages page of wikipedia
import puppeteer from 'puppeteer';
import fs from 'fs';
import { getFirstLine } from './lib.js';
import { indexUrls } from './indexer_url.js';

// launch the browser
const browser = await puppeteer.launch({headless: false});

const recursiveGetLinks = async (browser, link) => {
    const page = await browser.newPage();

    await page.goto(link);

    // Get articles link
    const articlesLinks = await page.$$eval('.mw-allpages-body a', as => as.map(a => a.href.replace(/https:\/\/en\.wikipedia\.org\/wiki\//gm, '')));

    // register links on the db via indexer_url.js
    indexUrls(articlesLinks);

    // get link to the next page of links
    const nextPageLink = await page.$$eval('.mw-allpages-nav a', as => as[1].href);
    console.log(nextPageLink)
    // recursive while there is a next page of links
    if (nextPageLink !== undefined) {
        // register nextpagelink in a file to remember we've been there before
        fs.writeFile('./pages', nextPageLink + '\r\n', { flag: 'w+' }, err => {
            if (err) {
                console.error(err);
                return;
            } else {
                // file written successfully
                console.log(`written succesfully until ${nextPageLink}`);
            }
        });
        //  ! décommenter
        await page.close()
        recursiveGetLinks(browser, nextPageLink)
    }
    // await browser.close();
}

// Page to visit
const getAllLinksLastPage = await getFirstLine('./pages');
console.log(getAllLinksLastPage);

// Launch recursive function
recursiveGetLinks(browser, getAllLinksLastPage);

// Close the browser once everything is finished
// await browser.close();

