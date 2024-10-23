// npm install node-forge -S

const getCircleClient = require("./config/circle-client"); // Import the reusable client

const circleClient = getCircleClient(); // Get the client instance

const forge = require("node-forge");

const PUBLIC_KEY =
  "-----BEGIN PUBLIC KEY-----\n" +
  "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAtgOnv8ZzedkuUMop70iz\n" +
  "HzXGdiA4kWztJ9e4vKw3IOLfAbCGNH7UxImrx7Of84EL7lTsF3ErUaCyGdqL/Axn\n" +
  "qyDMcdh/xwbsrrLdNntKKW14iDWfDI1ne0gDg6dVqHlT8FKArwQEQHh2ntX5BoSJ\n" +
  "Na6NjEWKpI0knupWcP3+KjvqiDH8P0rhi3zENAmprGl+Y4Nk3+JAI0IMLkxNjWqL\n" +
  "MCRi96GTzSpJYyqjsB7D58BgzXuZdIl8qymgMWWuWMlxDVcFiJ5JqF8q5y45lIih\n" +
  "vUJ3ZCQ+rdfkEGHawiCoUIiMSt61bGboSzlHFZwizrj/zB7FKOLGD1gkxmcVI10p\n" +
  "DhUCnRYt31pRIqYYTX5KIwcvs4Wn/bnnim8BiLyR+q4uT9b7XKaP7To/qCNl3C1s\n" +
  "vj3QWPG9MbPUXCBE7TBzEkl8OX4Zqcog5k6UeVIEjcll9K5ZJ1FIQaeYfW1ZPvtY\n" +
  "Ry9iRqtlZcNuWISBZeoefdKdg3vDdTVFaaVxnaRK8OOmf6BGL06kxr+sBgDXSAOP\n" +
  "K3Qbihe1C0k7nJJBL7kUIGwKCWipq0lazoJFPNrsULXvVZf26gcFbTxPLvutGizU\n" +
  "fAjscztqXdYYFZlSd/ptKUG7W30AZGkjj/LEWTJBvnK0K0PE3KJBee5JGfnI1ZwB\n" +
  "YMyO89r44M1oKfA6WWfcPGkCAwEAAQ==\n" +
  "-----END PUBLIC KEY-----\n";

// import forge from "node-forge"

// const generatePublicKey = async () => {
//   const response = await circleClient.getPublicKey({});

//   console.log(response);
// };

// generatePublicKey();

const entitySecret = forge.util.hexToBytes(
  "1e149040285d1f31bc00f18204d7fb7a53fc114c0b31473e505c96224b3bd66a"
);
const publicKey = forge.pki.publicKeyFromPem(PUBLIC_KEY);
const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
  md: forge.md.sha256.create(),
  mgf1: {
    md: forge.md.sha256.create(),
  },
});

console.log(forge.util.encode64(encryptedData));
