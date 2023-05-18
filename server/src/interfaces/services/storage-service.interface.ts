export interface IStorageService {
  saveScreenshotImage(appId: string, imageData: Buffer): Promise<string>;
}
