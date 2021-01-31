const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    //executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    headless:false
  });
  const page = await browser.newPage();
  await page.goto('https://sports.bwin.es/es/sports/directo/apuestas');
  //await page.screenshot({path: 'example.png'});

  await page.on('response', resp  =>  {
    // var header = resp.headers();
    resp.text().then(result => console.log(result))

    // console.log("value: " + header['content-disposition']);
    
});

//https://stackoverflow.com/questions/48375700/how-to-use-puppeteer-to-dump-websocket-data

  //await browser.close();
})();