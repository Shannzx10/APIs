const axios = require('axios')
const cheerio = require('cheerio')

const ssweb = (url, device = 'desktop') => {
    return new Promise((resolve, reject) => {
        const base = 'https://www.screenshotmachine.com';
        const param = {
            url: url,
            device: device,
            cacheLimit: 0
        };

        axios({
            url: base + '/capture.php',
            method: 'POST',
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((data) => {
            const cookies = data.headers['set-cookie'];
            if (data.data.status == 'success') {
                axios.get(base + '/' + data.data.link, {
                    headers: {
                        'cookie': cookies.join('')
                    },
                    responseType: 'arraybuffer'
                }).then(({ data }) => {
                    resolve(data);
                }).catch(reject);
            } else {
                reject(`Link Error: ${data.data.message}`);
            }
        }).catch(reject);
    });
};

function uuid() {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

async function obfus(query) {
  return new Promise((resolve, reject) => {
  try {
  const jsobfus = require('javascript-obfuscator')
  const obfuscationResult = jsobfus.obfuscate(query, {
    compact: false,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true, 
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1
  });
  const result = {
    status: 200,
    author: `Shannz`,
    result: obfuscationResult.getObfuscatedCode()
  }
  resolve(result)
  } catch (e) {
      reject(e)
    }
  })
}

module.exports = { ssweb, uuid, obfus };