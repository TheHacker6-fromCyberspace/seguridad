// Simple JWT Implementation for Client-Side
// Note: This is for demonstration. In production, use server-side JWT with proper secret management.

(function(global) {
  'use strict';

  // Base64 URL encoding/decoding
  const base64UrlEncode = (str) => {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const base64UrlDecode = (str) => {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
      str += '=';
    }
    return atob(str);
  };

  // Simple HMAC SHA-256 implementation using Web Crypto API
  const hmacSHA256 = async (message, secret) => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(message);

    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, messageData);
    return btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  // Create JWT token
  const createToken = async (payload, secret, expiresIn = 7200) => {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const tokenPayload = {
      ...payload,
      iat: now,
      exp: now + expiresIn
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(tokenPayload));
    const message = `${encodedHeader}.${encodedPayload}`;
    
    const signature = await hmacSHA256(message, secret);
    
    return `${message}.${signature}`;
  };

  // Verify and decode JWT token
  const verifyToken = async (token, secret) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }

      const [encodedHeader, encodedPayload, signature] = parts;
      const message = `${encodedHeader}.${encodedPayload}`;
      
      // Verify signature
      const expectedSignature = await hmacSHA256(message, secret);
      if (signature !== expectedSignature) {
        throw new Error('Invalid signature');
      }

      // Decode payload
      const payload = JSON.parse(base64UrlDecode(encodedPayload));

      // Check expiration
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        throw new Error('Token expired');
      }

      return payload;
    } catch (error) {
      throw new Error(`Token verification failed: ${error.message}`);
    }
  };

  // Decode token without verification (for reading payload)
  const decodeToken = (token) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }

      const payload = JSON.parse(base64UrlDecode(parts[1]));
      return payload;
    } catch (error) {
      throw new Error(`Token decode failed: ${error.message}`);
    }
  };

  // Export functions
  global.JWT = {
    create: createToken,
    verify: verifyToken,
    decode: decodeToken
  };

})(window);

