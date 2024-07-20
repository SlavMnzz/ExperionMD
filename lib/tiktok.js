const axios = require("axios");

const clean = (data) => {

  let regex = /(<([^>]+)>)/gi;

  data = data.replace(/(<br?\s?\/>)/gi, " \n");

  return data.replace(regex, "");

};

async function shortener(url) {

  return url;

}

exports.Tiktok = async(query) => {

  try {

    let response = await axios("https://lovetik.com/api/ajax/search", {

      method: "POST",

      data: new URLSearchParams(Object.entries({ query })),

    });

    console.log("API Response:", response.data); // Log the response for debugging

    let result = {};

    result.creator = "YNTKTS";

    result.title = clean(response.data.desc || "");

    result.author = clean(response.data.author || "");

    let links = response.data.links || [];

    console.log("Links Data:", links); // Log links data for debugging

    // Validate each link object and its property 'a'

    let nowmLink = links.find(link => link.name === "No Watermark" && link.a);

    let watermarkLink = links.find(link => link.name === "Watermark" && link.a);

    let audioLink = links.find(link => link.name === "Audio" && link.a);

    // Log the links to ensure they are found correctly

    console.log("No Watermark Link:", nowmLink);

    console.log("Watermark Link:", watermarkLink);

    console.log("Audio Link:", audioLink);

    result.nowm = nowmLink ? await shortener(nowmLink.a.replace("https", "http")) : "";

    result.watermark = watermarkLink ? await shortener(watermarkLink.a.replace("https", "http")) : "";

    result.audio = audioLink ? await shortener(audioLink.a.replace("https", "http")) : "";

    result.thumbnail = await shortener(response.data.cover || "");

    console.log("Result Data:", result); // Log the final result for debugging

    return result;

  } catch (error) {

    console.error("Error fetching TikTok data:", error);

    throw error;

  }

};