const cheerio = require("cheerio");
const axios = require('axios')


function pinterest(querry){
	return new Promise(async(resolve,reject) => {
		 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
			headers: {
			"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
		}
			}).then(({ data }) => {
		const $ = cheerio.load(data)
		const result = [];
		const hasil = [];
   		 $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
		});
   		result.forEach(v => {
		 if(v == undefined) return
		 hasil.push(v.replace(/236/g,'736'))
			})
			hasil.shift();
		resolve(hasil)
		})
	})
}

async function capcut(url) {
    try {
        const response = await axios.post("https://api.teknogram.id/v1/capcut", { url });
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function tiktoks(query) {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://tikwm.com/api/feed/search',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'current_language=en',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
      },
      data: {
        keywords: query,
        count: 10,
        cursor: 0,
        HD: 1
      }
    });

    const videos = response.data.data.videos;
    if (videos.length === 0) {
      throw new Error("Tidak ada video ditemukan.");
    } else {
      const gywee = Math.floor(Math.random() * videos.length);
      const videorndm = videos[gywee]; 

      const result = {
        title: videorndm.title,
        cover: videorndm.cover,
        origin_cover: videorndm.origin_cover,
        no_watermark: videorndm.play,
        watermark: videorndm.wmplay,
        music: videorndm.music
      };
      return result;
    }
  } catch (error) {
    throw error;
  }
}

async function instagram(link) {
    try {
        const data = await axios("https://fastdl.app/api/convert", {
            method: "POST",
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            data: {
                "url": link,
                "ts": 1717886361080,
                "_ts": 1717498039111,
                "_tsc": 2178064,
                "_s": "881325deb3a090678823ebc67026858605bca3f91df3f3b96e0eaac7965a9754"
            }
        })
    let result = {
        output: data.data
    }
    return result;
    } catch (er) {
    console.error(er)
    }
}

async function tiktok(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set("url", query);
      encodedParams.set("hd", "1");

      const response = await axios({
        method: "POST",
        url: "https://tikwm.com/api/",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Cookie: "current_language=en",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        },
        data: encodedParams,
      });
      const videos = response.data;
      resolve(videos);
    } catch (error) {
      reject(error);
    }
  });
}

async function tiktokAll(url) {
    try {
      const response = await axios.post(
        'https://ttsave.app/download',
        {
          query: url, language_id: '1'
        },
        {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        }
      )

      const html = response.data
      const $ = cheerio.load(html)

      const uniqueId = $('h2.font-extrabold.text-xl.text-center').text()
      const urls = $('a[title="zuo888z"]').attr('href')
      const thumbnail = $('a[title="zuo888z"] img').attr('src')
      const download = []

      $('a[onclick="bdl(this, event)"]').each((index, element) => {
        const type = $(element).attr('type')
        const link = $(element).attr('href')
        download.push({
          type, link
        })
      })

      return {
        uniqueId,
        urls,
        thumbnail,
        download
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async function ttStalker(user) {
    try {
      const response = await axios.post(
        'https://ttsave.app/download',
        {
          query: user, language_id: '1'
        },
        {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        }
      )

      const $ = cheerio.load(response.data)

      const uniqueId = $('#unique-id').val()
      const username = $('h2').text().trim()
      const thumbnail = $('a[target="_blank"] img').attr('src')
      const download = $('a[target="_blank"]').attr('href')

      return {
        uniqueId,
        username,
        thumbnail,
        download
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async function ttSlide(url) {
    try {
      const response = await axios.post(
        'https://ttsave.app/download',
        {
          query: url, language_id: '2'
        },
        {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        }
      )

      const html = response.data
      const $ = cheerio.load(html)

      const uniqueId = $('#unique-id').val()
      const username = $('h2.font-extrabold.text-xl.text-center').text()
      const thumbnail = $('a[target="_blank"]').attr('href')
      const profile = $('img.h-24.w-34.rounded-full').attr('src')
      const description = $('p.text-gray-600.px-2.text-center.break-all.w-3/4.oneliner').text()

      const stats = {
        views: $('svg.h-5.w-5.text-gray-500 + span').text(),
        likes: $('svg.h-5.w-5.text-red-500 + span').text(),
        comments: $('svg.h-5.w-5.text-green-500 + span').text(),
        shares: $('svg.h-5.w-5.text-yellow-500 + span').text(),
        downloads: $('svg.h-5.w-5.text-blue-500 + span').text()
      }

      const download = []
      $('a[onclick="bdl(this, event)"]').each((i, elem) => {
        const link = $(elem).attr('href')
        const type = $(elem).attr('type')
        const title = $(elem).text().trim()
        download.push({
          link, type, title
        })
      })

      return {
        uniqueId,
        username,
        thumbnail,
        profile,
        description,
        stats,
        download
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  
module.exports = {
  tiktok,
  tiktokAll,
  ttStalker,
  ttSlide,
  instagram,
  tiktoks,
  capcut,
  pinterest
};