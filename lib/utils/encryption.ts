import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const ALGORITHM = 'aes-256-cbc';
const OUTPUT_ENCODING = 'hex';
const INPUT_ENCODING = 'utf8';

export function generateEncryptionKey(): string {
    return randomBytes(KEY_LENGTH).toString(OUTPUT_ENCODING);
}

export function encrypt(text: string, secretKey: string): string {
    try {
        const iv = randomBytes(IV_LENGTH);

        const key = Buffer.from(secretKey, OUTPUT_ENCODING);

        const cipher = createCipheriv(ALGORITHM, key, iv);

        let encrypted = cipher.update(text, INPUT_ENCODING, OUTPUT_ENCODING);
        encrypted += cipher.final(OUTPUT_ENCODING);

        return iv.toString(OUTPUT_ENCODING) + ':' + encrypted;
    } catch (error) {
        console.error('Encryption failed:', error);
        throw new Error('Encryption operation failed');
    }
}

export function decrypt(encryptedText: string, secretKey: string): string {
    try {
        const parts = encryptedText.split(':');
        if (parts.length !== 2) {
            throw new Error('Invalid encrypted text format');
        }

        const iv = Buffer.from(parts[0], OUTPUT_ENCODING);
        const encrypted = parts[1];

        const key = Buffer.from(secretKey, OUTPUT_ENCODING);

        const decipher = createDecipheriv(ALGORITHM, key, iv);

        let decrypted = decipher.update(encrypted, OUTPUT_ENCODING, INPUT_ENCODING);
        decrypted += decipher.final(INPUT_ENCODING);

        return decrypted;
    } catch (error) {
        console.error('Decryption failed:', error);
        throw new Error('Decryption operation failed');
    }
}


export function getApplicationEncryptionKey(): string {
    if (typeof process !== 'undefined' && process.env.ENCRYPTION_KEY) {
        return process.env.ENCRYPTION_KEY;
    }
    return '5eb9e8c09b07d562c411568e06c3ed37c1fd8158e615a6f7c9826a119d0d7370';
} 