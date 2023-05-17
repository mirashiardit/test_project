class EnvironmentConfig {
    private env: Record<string, string>;
  
    constructor() {
      this.env = process.env as Record<string, string>;
    }
  
    get(key: string): string | undefined {
      return this.env[key];
    }
  
    require(key: string): string {
      const value = this.get(key);
      if (!value) {
        throw new Error(`Environment variable ${key} is missing.`);
      }
      return value;
    }
  
    getOrThrow(key: string): string {
      const value = this.get(key);
      if (!value) {
        throw new Error(`Environment variable ${key} is missing.`);
      }
      return value;
    }
  }
  
  const envConfig = new EnvironmentConfig();
  
  export default envConfig;