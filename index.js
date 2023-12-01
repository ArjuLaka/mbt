const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function scrapeWebsite(url) {
  // Use axios to fetch the initial HTML
  const { data } = await axios.get(url);

  // Launch a headless browser with puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the HTML content of the page with the fetched data
  await page.setContent(data);

  // Wait for the page to fully render
  await page.waitForTimeout(2000); // Adjust the timeout as needed

  // Get the HTML content after rendering
  const renderedHTML = await page.content();

  // Use Cheerio to parse the rendered HTML
  const $ = cheerio.load(renderedHTML);

  // Now you can use Cheerio selectors to scrape the content
  const title = $('body').text();
  console.log('body:', title);

  // Close the browser
  await browser.close();
}

// Replace 'your_website_url' with the actual URL you want to scrape
scrapeWebsite('https://simpletech-mbt.co.id/');
