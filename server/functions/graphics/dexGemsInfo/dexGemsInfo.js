import * as d3 from "d3";
import nodeHtmlToImage from "node-html-to-image";
import getTemplate from "../template/template.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createUniswapV2Info = () => {
  const css = fs.readFileSync(
    path.normalize(__dirname + "/img_uniswapV2Info.css"),
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

  window.d3
    .select(".gemCrawler-logo")
    .attr("src", "https://i.imgur.com/BGJIAsp.png"); //get pink gemcrawler logo

  window.d3
    .select(".title")
    .text("GemCrawler's MicroCap Alpha: Uniswap Latest Launches"); //set title

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
    .attr("id", "liquidity-info"); //add liquidity info line

  window.d3
    .selectAll(".info-item")
    .append("img")
    .attr("class", "checkmark-symbol")
    .attr("src", "https://i.imgur.com/YD92Aly.png"); //add pink checkmark symbols

  window.d3
    .select("#mcap-info")
    .append("p")
    .attr("class", "info-text")
    .text("MarketCap: $5k - $500k"); //add market cap info text

  window.d3
    .select("#volume-info")
    .append("p")
    .attr("class", "info-text")
    .text("Volume to MarketCap Ratio of more than 10%"); //add volume info text

  window.d3
    .select("#liquidity-info")
    .append("p")
    .attr("class", "info-text")
    .text("Liquidity to MarketCap Ratio of more than 10%"); //add liquidity info text

  window.d3
    .select(".main")
    .append("p")
    .attr("class", "hit-follow")
    .text("Hit Follow. Get Alpha.");

  window.d3.select(".footer-optional").text("Sources: "); //set footer optional text

  window.d3
    .select(".footer-optional")
    .append("img")
    .attr("class", "logo-uniswap")
    .attr("src", "https://i.imgur.com/O7vxMG6.png"); //set footer uniswap logo

  window.d3
    .select(".footer-optional")
    .append("img")
    .attr("class", "logo-etherscan")
    .attr("src", "https://i.imgur.com/e8gr3v4.png"); //set footer etherscan logo

  return dom.serialize();
};

const saveUniswapV2InfoPNG = async (chart) => {
  await nodeHtmlToImage({
    output: "./server/img/GemCrawler_uniswapV2Info_1600x900.png",
    html: chart,
    puppeteerArgs: { args: ["--no-sandbox"] },
  });
  console.log("The image was created successfully!");
};

export { createUniswapV2Info, saveUniswapV2InfoPNG };