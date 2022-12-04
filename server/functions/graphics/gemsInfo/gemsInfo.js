import * as d3 from "d3";
import nodeHtmlToImage from "node-html-to-image";
import getTemplate from "../template/template.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createGemInfo = () => {
  const css = fs.readFileSync(
    path.normalize(__dirname + "/img_gemInfo.css"),
    "utf8"
  );

  const template = getTemplate();
  const dom = template.dom;
  const window = dom.window;
  window.d3 = d3.select(window.document);

  window.d3 //add stylesheet
    .select("head")
    .append("style")
    .attr("type", "text/css")
    .html(css);

  window.d3.select(".title").text("GemCrawler's Daily Gems"); //set title

  window.d3.select(".main").append("div").attr("class", "box-infoText");

  window.d3
    .select(".box-infoText")
    .append("div")
    .attr("class", "info-item")
    .attr("id", "mcap-info"); //add market cap info line

  window.d3
    .select(".box-infoText")
    .append("div")
    .attr("class", "info-item")
    .attr("id", "volume-info"); //add volume info line

  window.d3
    .select(".box-infoText")
    .append("div")
    .attr("class", "info-item")
    .attr("id", "trustscore-info"); //add trustscore info line

  window.d3
    .selectAll(".info-item")
    .append("img")
    .attr("class", "checkmark-symbol")
    .attr("src", "https://i.imgur.com/Qjxd1DF.png"); //add checkmark symbols

  window.d3
    .select("#mcap-info")
    .append("p")
    .attr("class", "info-text")
    .text("Low MarketCap ($1m-$10m) on CoinMarketCap"); //add market cap info text

  window.d3
    .select("#volume-info")
    .append("p")
    .attr("class", "info-text")
    .text("24hr Volume/MCap Ratio of more than 10%"); //add volume info text

  window.d3
    .select("#trustscore-info")
    .append("p")
    .attr("class", "info-text")
    .text("High Trust Score Exchange Listings"); //add trust score info text

  window.d3
    .select(".main")
    .append("p")
    .attr("class", "hit-follow")
    .text("Hit Follow. Get Alpha.");

  window.d3.select(".footer-optional").text("Sources: "); //set footer optional text

  window.d3
    .select(".footer-optional")
    .append("img")
    .attr("class", "logo-coingecko")
    .attr("src", "https://i.imgur.com/xPlVJ0i.png"); //set footer coingecko logo

  window.d3
    .select(".footer-optional")
    .append("img")
    .attr("class", "logo-coinmarketcap")
    .attr("src", "https://i.imgur.com/z1fsvE0.png"); //set footer coinmarketcap logo

  return dom.serialize();
};

const saveGemInfoPNG = async (chart) => {
  await nodeHtmlToImage({
    output: "./server/img/GemCrawler_gemInfo_1600x900.png",
    html: chart,
    puppeteerArgs: { args: ["--no-sandbox"] },
  });
  console.log("The image was created successfully!");
};

export { createGemInfo, saveGemInfoPNG };
