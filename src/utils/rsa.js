import forge from 'node-forge';
import config from './config';

const {
  pki, util, rsa, pem, md,
} = forge;

const {PUBLIC_KEY} = config;


/**
 * 将PKCS#1转换为PKCS#8
 * @param prvKeyObj
 * @returns {the|*}
 */
pki.privateKeyPKCS1ToPKCS8 = function (prvKeyObj) {
  // 生成pkcs#8格式的pem
  const rsaPrivateKey = pki.privateKeyToAsn1(prvKeyObj);
  const privateKeyInfo = pki.wrapRsaPrivateKey(rsaPrivateKey);
  const privateKeyPem = pki.privateKeyInfoToPem(privateKeyInfo);
  return pki.privateKeyFromPem(privateKeyPem);
};

/**
 * 提取pem中的body
 * @param Pem
 * @returns {the|*}
 */
pki.bodyFromPem = function (Pem) {
  return util.encode64(pem.decode(Pem)[0].body);
};

/**
 * 将body转换为pem格式
 * @param pem
 * @param pemHeader
 * @returns {*}
 */
pki.bodyToPem = function (body, pemHeader) {
  const pemBody = body;
  return `-----BEGIN ${pemHeader}-----\r\n${pemBody}\r\n-----END ${pemHeader}-----\r\n`;
};

/**
 * 将私钥的body转换为pkcs#8格式的pem
 * @param raw
 * @returns {*}
 */
pki.privateKeyBodyToPem = function (body) {
  return pki.bodyToPem(body, 'PRIVATE KEY');
};

/**
 * 将公钥的body转换为pem格式
 * @param raw
 * @returns {*}
 */
pki.publicKeyBodyToPem = function (body) {
  return pki.bodyToPem(body, 'PUBLIC KEY');
};

/**
 * 加密
 * @param text 待加密的字符串
 * @param key 加密的key
 * @param isPub 是否使用publicKey加密，默认false
 * @returns {*}
 */
function encrypt(text, key, isPub) {
  // Encrypt with key...
  const encryptKeyPem = isPub ? pki.publicKeyBodyToPem(key) : pki.privateKeyBodyToPem(key);
  const encryptKey = isPub ? pki.publicKeyFromPem(encryptKeyPem) : pki.privateKeyPKCS1ToPKCS8(pki.privateKeyFromPem(encryptKeyPem));
  const buffer = util.createBuffer(util.encodeUtf8(text));
  const binaryString = buffer.getBytes();
  if (isPub) {
    return util.encode64(encryptKey.encrypt(binaryString));
  } else {
    return util.encode64(encryptKey.encrypt(binaryString));
  }
}

/**
 * 解密
 * @param text 待解密的字符串
 * @param key 解密的key
 * @param isPub 是否使用publicKey解密，默认false
 * @returns {*}
 */
function decrypt(text, key, isPub) {
  // Decrypt with key...
  const decryptKeyPem = isPub ? pki.publicKeyBodyToPem(key) : pki.privateKeyBodyToPem(key);
  const decryptKey = isPub ? pki.publicKeyFromPem(decryptKeyPem) : pki.privateKeyPKCS1ToPKCS8(pki.privateKeyFromPem(decryptKeyPem));
  const binaryString = util.decode64(text);
  if (isPub) {
    return util.decodeUtf8(decryptKey.decrypt(binaryString));
  } else {
    return util.decodeUtf8(decryptKey.decrypt(binaryString));
  }
}

const rsaEncrypt = (plainText) => {
  const encryptText = encrypt(plainText, PUBLIC_KEY, true);
  return encryptText;
};

export default {
  rsaEncrypt,
};

