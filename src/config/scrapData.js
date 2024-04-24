import puppeteer from "puppeteer";

const getDataFromWebPage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

 
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36"
  );

  await page.goto("https://www.elpalaciodehierro.com/belleza/fragancias/");

  await page.evaluate(async () => {
    const distance = 100;
    const delay = 300;
    while (window.scrollY + window.innerHeight < document.body.scrollHeight) {
      window.scrollBy(0, distance);
      await new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }
  });


  const result = await page.evaluate(async () => {
    //get all the images from main page
    const products = Array.from(document.querySelectorAll(".b-product"));
    return products.map(async (product) => {
      const brandElement = product.querySelector(".b-product_tile-brand");
      const brandName = brandElement
        ? brandElement.textContent.trim()
        : "Brand not found";

      const productName = product.querySelector('.b-product_tile-name a').textContent.trim()
      const price = product.querySelector('.b-product_tile-price').textContent.trim()
      const srcsetAttribute =product.querySelector(".b-product_image source")
            ?.getAttribute("srcset") || "Srcset not found";
            
    //click on product to scrape more info
    // await page.click('.b-product_image')
    // await page.waitForNavigation({ waitUntil: 'networkidle0' });
    
            return {srcsetAttribute, brandName,productName,  price };
    });
  });
  console.log(result);


  await browser.close()
  return result;
};

export { getDataFromWebPage };
