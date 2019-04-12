const https  = require('https');
const crypto = require('crypto');
const url    = require('url');

//'https://mastodon.social/inbox'
const PRIVATE_KEY  = process.env.PRIVATE;

function deliver(note, toInboxUrl) {
  const inbox     = url.parse(toInboxUrl);
  const keyId     = `https://tinyap.glitch.me/${note.actor}#main-key`;
  const date      = (new Date()).toUTCString();
  const str       = `(request-target): post ${inbox.path}\nhost: ${inbox.host}\ndate: ${date}`;
  const signature = `keyId="${keyId}",headers="(request-target) host date",signature="${sign(str)}"`;

  const options = {
    method: 'POST',
    headers: {
      'Host': inbox.host,
      'Date': date,
      'Signature': signature
    }
  };

  const req = https.request(inbox.href, options, (res) => {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => console.log(data));
  });
  req.on('error', (e) => console.error(e));
  req.write(activity(note));
  req.end();
}

function sign(str) {
  const sign = crypto.createSign('SHA256');
  sign.write(str);
  sign.end();
  return sign.sign(PRIVATE_KEY, 'base64');
}

function activity(note) {
  return JSON.stringify({
    "@context": "https://www.w3.org/ns/activitystreams",
    "id": "https://tinyap.glitch.me/activity/create-note/" + note.rowid,
    "type": "Create",
    "actor": "https://tinyap.glitch.me/" + note.actor,
    "object": note.apObject()
  });
}

module.exports = exports = { deliver };