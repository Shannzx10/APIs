const cheerio = require("cheerio");
const axios = require('axios')


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
  capcut
};