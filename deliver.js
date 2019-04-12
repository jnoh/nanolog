const https  = require('https');
const crypto = require('crypto');
const fs     = require('fs');

const body          = fs.readFileSync('./public/create-hello-world.json');
const date          = (new Date()).toUTCString();
const privateKey    = process.env.PRIVATE;
const str           = `(request-target): post /inbox\nhost: mastodon.social\ndate: ${date}`;
const signedStr     = encrypt(str, privateKey);
const signature     = `keyId="https://tinyap.glitch.me/actor",headers="(request-target) host date",signature="${signedStr}"`;

const options = {
  method: 'POST',
  headers: {
    'Host': 'mastodon.social',
    'Date': date,
    'Signature': signature
  }
};

console.log(options);

/*
const req = https.request(url, options, res => {
  let data = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => console.log(data));
});
req.on('error', (e) => throw e);
req.write(body);
req.end();
*/

function encrypt(str, private) {
  var buffer = Buffer.from(str);
  var encrypted = crypto.privateEncrypt(private, buffer);
  return encrypted.toString("base64");
}
