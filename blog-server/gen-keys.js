const NodeRSA = require('node-rsa');
const fs = require('fs');
const path = require('path');

const newkey = new NodeRSA({ b: 2048 });
newkey.setOptions({ encryptionScheme: 'pkcs1' });

let public_key = newkey.exportKey('pkcs8-public');
let private_key = newkey.exportKey('pkcs8-private');

const authDir = path.join(__dirname, 'auth');
fs.writeFileSync(path.join(authDir, 'public.cer'), public_key);
fs.writeFileSync(path.join(authDir, 'private.cer'), private_key);

// Verify
const testKey = new NodeRSA(public_key);
testKey.setOptions({ encryptionScheme: 'pkcs1' });
const encrypted = testKey.encrypt('test1234', 'base64');

const testPriKey = new NodeRSA(private_key);
testPriKey.setOptions({ encryptionScheme: 'pkcs1' });
const decrypted = testPriKey.decrypt(encrypted, 'utf8');

console.log('Keys generated with node-rsa + PKCS1');
console.log('Verify:', decrypted === 'test1234' ? 'PASS' : 'FAIL');