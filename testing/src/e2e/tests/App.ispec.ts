import puppeteer from 'puppeteer'
const screenshot = 'amazon_nyan_cat_pullover.png'
/**
 * @name Amazon search
 *
 * @desc Looks for a "nyan cat pullover" on amazon.com, goes two page two clicks the third one.
 */
describe('simple e2e', () => {
  test('', async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.amazon.com')
    await page.type('#twotabsearchtextbox', 'nyan cat pullover')
    await page.click('#nav-search-submit-text > input')
    await page.waitForSelector('.a-section')
    await page.screenshot({ path: 'amazon_nyan_cat_pullovers_list.png' })
    const pullovers = await page.$$('div.a-section.aok-relative.s-image-square-aspect')
    await pullovers[2].click()
    await page.waitForSelector('#ppd')
    await page.screenshot({ path: screenshot })
    await browser.close()
    console.log('See screenshot: ' + screenshot)
  }, 16000)
})
