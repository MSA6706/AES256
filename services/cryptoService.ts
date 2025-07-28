
// This line tells TypeScript that CryptoJS exists as a global variable,
// which is true because we loaded it from a CDN in index.html.
declare var CryptoJS: any;

/**
 * Encrypts a text using AES-256.
 * @param text The plain text to encrypt.
 * @param key The secret key.
 * @returns The Base64-encoded ciphertext.
 */
export const encryptText = (text: string, key: string): string => {
    try {
        const encrypted = CryptoJS.AES.encrypt(text, key).toString();
        if (!encrypted) {
             throw new Error("فرایند رمزگذاری نتیجه‌ای تولید نکرد.");
        }
        return encrypted;
    } catch (error) {
        console.error("Encryption failed:", error);
        throw new Error("فرایند رمزگذاری با خطا مواجه شد.");
    }
};

/**
 * Decrypts a ciphertext using AES-256.
 * @param ciphertext The Base64-encoded ciphertext to decrypt.
 * @param key The secret key.
 * @returns The original plain text.
 */
export const decryptText = (ciphertext: string, key: string): string => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        
        // If decryption fails (e.g., wrong key), toString(Utf8) returns an empty string.
        if (!originalText) {
            throw new Error("Decryption resulted in empty text. This might be due to a wrong key.");
        }
        return originalText;
    } catch (error) {
        console.error("Decryption failed:", error);
        // We throw a more user-friendly error message.
        throw new Error("رمزگشایی ناموفق بود. کلید وارد شده صحیح نیست یا متن رمز شده معتبر نمی‌باشد.");
    }
};
