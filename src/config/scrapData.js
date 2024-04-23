import puppeteer from "puppeteer";

const getDataFromWebPage = async () => {
   console.log('getting data')
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // page.on('console', consoleObj => console.log(consoleObj.text()));
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36');

    await page.goto('https://www.elpalaciodehierro.com/belleza/fragancias/')

    const result = await page.evaluate(() => {

        const products = Array.from(document.querySelectorAll('.b-product'));
       return products.map(product => {
          const brandElement = product.querySelector('.b-product_tile-brand');
        return brandElement ? brandElement.textContent.trim() : 'Brand not found';
       })
    })
    console.log(result)
    return result
}


export {getDataFromWebPage}