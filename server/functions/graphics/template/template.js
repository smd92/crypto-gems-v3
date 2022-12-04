import { JSDOM } from "jsdom";
import * as d3 from "d3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateCSS = fs.readFileSync(
  path.normalize(__dirname + "/template.css"),
  "utf8"
);

const minHtml = "<html><head id='head'></head><body></body></html>";
const dom = new JSDOM(`${minHtml}`, {
  pretendToBeVisual: true,
  features: {
    FetchExternalResources: ["script", "css"],
  },
});
const window = dom.window;
window.d3 = d3.select(window.document);

const getTemplate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("en-US", { month: "short" });
  const day = today.getDate();
  const dateString = `${day}. ${month}. ${year}`;

  window.d3 //add stylesheet
    .select("head")
    .append("style")
    .attr("type", "text/css")
    .html(templateCSS);

  window.d3 //add container
    .select("body")
    .append("div")
    .attr("class", "container");

  window.d3 //add header
    .select(".container")
    .append("div")
    .attr("class", "header");

  window.d3 //add main
    .select(".container")
    .append("div")
    .attr("class", "main");

  window.d3 //add footer
    .select(".container")
    .append("div")
    .attr("class", "footer");

  window.d3 //add GemCrawler logo
    .select(".header")
    .append("img")
    .attr("src", "https://i.imgur.com/AUZf4Io.png")
    .attr("class", "gemCrawler-logo");

  window.d3 //add title
    .select(".header")
    .append("p")
    .attr("class", "title")
    .text("My Title");

  window.d3 //add twitter handle container
    .select(".footer")
    .append("div")
    .attr("class", "twitterHandle");

  window.d3 //add footer optional text
    .select(".footer")
    .append("div")
    .attr("class", "footer-optional")
    .text("Optional Text");

  window.d3 //add twitter logo
    .select(".twitterHandle")
    .append("img")
    .attr("src", "https://i.imgur.com/nEBZOAc.png")
    .attr("class", "twitter-logo");

  window.d3 //add twitter username
    .select(".twitterHandle")
    .append("p")
    .attr("class", "twitter-username")
    .text("@gemCrawler");

  return {
    dom,
    dateString,
  };
};

export default getTemplate;