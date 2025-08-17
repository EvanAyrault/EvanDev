export interface SiteConfig {
  sections: {
    services: boolean;
    features: boolean;
    contact: boolean;
    portfolio: boolean;
  };
  maintenance: boolean;
  maintenanceMessage: string;
}

class ConfigService {
  private readonly STORAGE_KEY = 'site_config';

  private getStoredConfig(): SiteConfig {
    if (typeof window === 'undefined') {
      return this.getDefaultConfig();
    }
    const config = localStorage.getItem(this.STORAGE_KEY);
    return config ? JSON.parse(config) : this.getDefaultConfig();
  }

  private getDefaultConfig(): SiteConfig {
    return {
      sections: {
        services: true,
        features: true,
        contact: true,
        portfolio: true,
      },
      maintenance: false,
      maintenanceMessage: 'Le site est en maintenance. Veuillez revenir plus tard.',
    };
  }

  private saveConfig(config: SiteConfig): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
  }

  getConfig(): SiteConfig {
    return this.getStoredConfig();
  }

  updateSectionAccess(section: keyof SiteConfig['sections'], enabled: boolean): void {
    const config = this.getStoredConfig();
    config.sections[section] = enabled;
    this.saveConfig(config);
  }

  toggleMaintenance(enabled: boolean, message?: string): void {
    const config = this.getStoredConfig();
    config.maintenance = enabled;
    if (message) {
      config.maintenanceMessage = message;
    }
    this.saveConfig(config);
  }

  isSectionEnabled(section: keyof SiteConfig['sections']): boolean {
    const config = this.getStoredConfig();
    return config.sections[section];
  }

  isMaintenanceMode(): boolean {
    const config = this.getStoredConfig();
    return config.maintenance;
  }

  getMaintenanceMessage(): string {
    const config = this.getStoredConfig();
    return config.maintenanceMessage;
  }
}

export const configService = new ConfigService(); 