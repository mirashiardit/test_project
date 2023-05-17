export interface IBrowserService {
    initialize(): Promise<void>;
    close(): Promise<void>;
    takeScreenshot(url: string): Promise<Buffer>;
}