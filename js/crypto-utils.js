// Crypto Utilities for Password Hashing
// Using Web Crypto API for secure hashing

(function(global) {
  'use strict';

  // SHA-256 hash function
  const sha256 = async (message) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  // PBKDF2 key derivation (more secure than simple SHA-256)
  const pbkdf2 = async (password, salt, iterations = 100000) => {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );

    const saltBuffer = encoder.encode(salt);
    
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations: iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      256
    );

    const hashArray = Array.from(new Uint8Array(derivedBits));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  // Generate random salt
  const generateSalt = () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  // Hash password with salt
  const hashPassword = async (password) => {
    const salt = generateSalt();
    const hash = await pbkdf2(password, salt);
    return `${salt}:${hash}`;
  };

  // Verify password against hash
  const verifyPassword = async (password, storedHash) => {
    try {
      const [salt, hash] = storedHash.split(':');
      const computedHash = await pbkdf2(password, salt);
      return computedHash === hash;
    } catch (error) {
      return false;
    }
  };

  // Simple encryption for data (AES-GCM)
  const encrypt = async (data, password) => {
    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encoder.encode(data)
    );

    const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    result.set(salt, 0);
    result.set(iv, salt.length);
    result.set(new Uint8Array(encrypted), salt.length + iv.length);

    return btoa(String.fromCharCode(...result));
  };

  // Decrypt data
  const decrypt = async (encryptedData, password) => {
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const data = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    
    const salt = data.slice(0, 16);
    const iv = data.slice(16, 28);
    const encrypted = data.slice(28);

    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encrypted
    );

    return decoder.decode(decrypted);
  };

  // Export functions
  global.CryptoUtils = {
    sha256,
    pbkdf2,
    generateSalt,
    hashPassword,
    verifyPassword,
    encrypt,
    decrypt
  };

})(window);

