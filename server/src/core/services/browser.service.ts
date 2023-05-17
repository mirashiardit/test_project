import puppeteer, {Browser} from 'puppeteer';

import { IBrowserService } from '../../interfaces/services/browser-service.interface';

export class BrowserService implements IBrowserService {
  private browser: Browser | null;

  constructor() {
    this.browser = null;
  }

  public async initialize(): Promise<void> {
    this.browser = await puppeteer.launch({
        headless: "new"
    });
  }

  public async takeScreenshot(url: string): Promise<Buffer> {
    if (!this.browser) {
      throw new Error('Browser is not initialized. Call initialize() first.');
    }

    const page = await this.browser.newPage();
    await page.goto(url);

    await page.setViewport({ width: 1920, height: 1080 });

    const screenshot = await page.screenshot();

    await page.close();

    return screenshot;
  }

  public async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
