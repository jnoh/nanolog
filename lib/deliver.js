const https  = require('https');
const crypto = require('crypto');
const fs     = require('fs');

const body        = fs.readFileSync('./public/create-hello-world.json');
const date        = (new Date()).toUTCString();
const privateKey  = process.env.PRIVATE;
const str         = `(request-target): post /inbox\nhost: mastodon.social\ndate: ${date}`;
const signedStr   = sign(str, privateKey);
const signature   = `keyId="https://tinyap.glitch.me/actor#main-key",headers="(request-target) host date",signature="${signedStr}"`;

const options = {
  method: 'POST',
  headers: {
    'Host': 'mastodon.social',
    'Date': date,
    'Signature': signature
  }
};

const req = https.request('https://mastodon.social/inbox', options, (res) => {
  let data = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => console.log(data));
});
req.on('error', (e) => console.error(e));
req.write(body);
req.end();

function sign(str, privateKey) {
  const sign = crypto.createSign('SHA256');
  sign.write(str);
  sign.end();
  return sign.sign(privateKey, 'base64');
}


export.