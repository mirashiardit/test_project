class UrlValidator {
  isGooglePlayStoreAppUrl(url: string): boolean {
    const regex =
      /^https?:\/\/play\.google\.com\/store\/apps\/details\?id=[a-zA-Z0-9._%+-]+(&[a-zA-Z0-9._%+-]+=[a-zA-Z0-9._%+-]+)*$/;

    return regex.test(url);
  }

  extractAppNameFromUrl(url: string): string {
    const urlObj = new URL(url);
    const appId = urlObj.searchParams.get("id");
    return appId || "N/A";
  }
}

const urlValidator = new UrlValidator();

export default urlValidator;
