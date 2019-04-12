const https  = require('https');
const crypto = require('crypto');

const actor       = "jnoh";
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

function deliver(note) {
  const req = https.request('https://mastodon.social/inbox', options, (res) => {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => console.log(data));
  });
  req.on('error', (e) => console.error(e));
  req.write(body(note));
  req.end();
}

function sign(str, privateKey) {
  const sign = crypto.createSign('SHA256');
  sign.write(str);
  sign.end();
  return sign.sign(privateKey, 'base64');
}

function body(note) {
  return JSON.stringify({
    "@context": "https://www.w3.org/ns/activitystreams",
    "id": "https://tinyap.glitch.me/create-" + note.rowid,
    "type": "Create",
    "actor": "https://tinyap.glitch.me/" + actor,
    "object": {
      "id": "https://tinyap.glitch.me/" + note.rowid,
      "type": "Note",
      "published": note.createdAt,
      "attributedTo": "https://tinyap.glitch.me/" + actor,
      "inReplyTo": "https://mastodon.social/@Gargron/100254678717223630",
      "content": note.content,
      "to": "https://www.w3.org/ns/activitystreams#Public"
    }
  });
}


module.exports = exports = { deliver, body };