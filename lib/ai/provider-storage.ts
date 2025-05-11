import { ProviderConfigs, ProviderType } from './types';
import { encrypt, decrypt, getApplicationEncryptionKey } from '../utils/encryption';

const STORAGE_KEY = 'ai-provider-configs';

export function getProviderConfigs(): ProviderConfigs {
    try {
        if (typeof window === 'undefined') {
            return {};
        }

        const encryptedData = localStorage.getItem(STORAGE_KEY);
        if (!encryptedData) {
            return {};
        }

        const decryptedData = decrypt(encryptedData, getApplicationEncryptionKey());
        return JSON.parse(decryptedData) as ProviderConfigs;
    } catch (error) {
        console.error('Failed to read provider configurations:', error);
        return {};
    }
}

export function saveProviderConfigs(configs: ProviderConfigs): void {
    try {
        if (typeof window === 'undefined') {
            return;
        }

        const data = JSON.stringify(configs);
        const encryptedData = encrypt(data, getApplicationEncryptionKey());
        localStorage.setItem(STORAGE_KEY, encryptedData);
    } catch (error) {
        console.error('Failed to save provider configurations:', error);
    }
}

export function getProviderConfig(providerType: ProviderType) {
    const configs = getProviderConfigs();
    return configs[providerType];
}

export function saveProviderConfig(providerType: ProviderType, config: any): void {
    const configs = getProviderConfigs();
    configs[providerType] = config;
    saveProviderConfigs(configs);
}

export function deleteProviderConfig(providerType: ProviderType): void {
    const configs = getProviderConfigs();

    if (configs[providerType]) {
        delete configs[providerType];
        saveProviderConfigs(configs);
    }
}

export function clearAllProviderConfigs(): void {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
}

export function getEnabledProviderTypes(): ProviderType[] {
    const configs = getProviderConfigs();

    return Object.entries(configs)
        .filter(([_, config]) => config.enabled)
        .map(([type]) => type as ProviderType);
}

export function isProviderEnabled(providerType: ProviderType): boolean {
    const config = getProviderConfig(providerType);
    return Boolean(config?.enabled);
}

export function exportProviderConfigs(): string {
    const configs = getProviderConfigs();
    return JSON.stringify(configs, null, 2);
}

export function importProviderConfigs(jsonData: string): boolean {
    try {
        const configs = JSON.parse(jsonData) as ProviderConfigs;
        saveProviderConfigs(configs);
        return true;
    } catch (error) {
        console.error('Failed to import provider configurations:', error);
        return false;
    }
} 