const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    headless:false
  });
  const page = await browser.newPage();
  await page.goto('http://www.visualeconomy.com/');
  //await page.screenshot({path: 'example.png'});

  await page.on('response', resp  =>  {
    // var header = resp.headers();
    resp.text().then(result => console.log(result))

    // console.log("value: " + header['content-disposition']);
    
});

  //await browser.close();
})();