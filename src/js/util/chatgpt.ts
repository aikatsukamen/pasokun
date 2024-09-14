import puppeteer from 'puppeteer';
import { sleep } from './util';

const conversation = async (comment: string) => {
  console.log('[chatgpt] conversation');

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const context = browser.defaultBrowserContext();
  // set clipBoard API permissions
  context.clearPermissionOverrides();
  context.overridePermissions('https://chatgpt.com', ['clipboard-read', 'clipboard-sanitized-write']);
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36');
  await page.goto('https://chatgpt.com/');
  await sleep(1 * 1000);

  await page.screenshot({ path: `${new Date().getTime()}_start.png` });

  await page.type('#prompt-textarea > p', '指示を与える。');
  await page.screenshot({ path: `${new Date().getTime()}.png` });

  await page.evaluate((textToCopy) => {
    console.log(`clipboardにコピーしたよ:\n ${textToCopy}`);
    navigator.clipboard.writeText(textToCopy);
  }, comment);
  await sleep(3 * 1000);

  // テキストボックスに入力
  // const textarea = await page.$('#prompt-textarea > p');
  // await textarea?.evaluate((t) => t.click());
  // await page.type('#prompt-textarea > p', comment, { delay: 0 });
  // await sleep(1 * 1000);
  const input = await page.$('#prompt-textarea > p');
  await input?.focus();
  await page.evaluate(() => {
    console.log('貼り付けだよ');
    navigator.clipboard.readText();
  });
  await sleep(1 * 1000);
  await page.screenshot({ path: `${new Date().getTime()}.png` });

  // 会話実行
  await page.keyboard.press('Enter');
  // await page.click('.rounded-full');

  await sleep(2 * 1000);

  await page.screenshot({ path: `${new Date().getTime()}_end.png` });

  browser.close();
};

export default {
  conversation,
};
