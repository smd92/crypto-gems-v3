import * as d3 from "d3";
import nodeHtmlToImage from "node-html-to-image";
import getTemplate from "../template/template.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createCGTrendingChart = (dataset) => {
  const css = fs.readFileSync(
    path.normalize(__dirname + "/coingeckoTrending.css"),
    "utf8"
  );

  const template = getTemplate();
  const date = template.dateString;
  const dom = template.dom;
  const window = dom.window;
  window.d3 = d3.select(window.document);

  window.d3 //add stylesheet
    .select("head")
    .append("style")
    .attr("type", "text/css")
    .html(css);

  window.d3.select(".title").text("Trending on CoinGecko"); //set title
  window.d3.select(".footer-optional").text("Powered by "); //set footer optional text
  window.d3
    .select(".footer-optional")
    .append("img")
    .attr("class", "logo-coingecko")
    .attr("src", "https://i.imgur.com/xPlVJ0i.png"); //set footer coingecko logo

  window.d3.select(".main").append("div").attr("class", "coins-container"); //add container for coins

  const coinDivs = window.d3 // add divs for coins
    .select(".coins-container")
    .selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "coin")
    .attr("id", (d, i) => `coin-rank-${i + 1}`);

  const coinInfoDivs = coinDivs.append("div").attr("class", "coin-info");

  coinInfoDivs //add rank
    .append("p")
    .attr("class", "coin-rank")
    .text((d, i) => `${i + 1}.`);

  coinInfoDivs //add logos
    .append("div")
    .attr("class", "coin-logo-container")
    .append("img")
    .attr("class", "coin-logo")
    .attr("src", (d) => d.item.large);

  coinInfoDivs //add symbols
    .append("p")
    .attr("class", "coin-symbol")
    .text((d) => d.item.symbol);

  window.d3 // add div for current date
    .select(".coins-container")
    .append("div")
    .attr("class", "date-container")
    .append("p")
    .attr("class", "date")
    .text(date);

  return dom.serialize();
};

const saveCGTrendingChart = async (chart) => {
  await nodeHtmlToImage({
    output: "./server/public/assets/coingeckoTrending.png",
    html: chart,
    puppeteerArgs: { args: ["--no-sandbox"] },
  });
  console.log("The image was created successfully!");
};

export { createCGTrendingChart, saveCGTrendingChart };
