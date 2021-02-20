import { readFileSync } from "fs";
import { ParsedRequest } from "./types";

const DotGothic16 = readFileSync(
  `${__dirname}/../_fonts/DotGothic16-Regular.ttf`
).toString("base64");

function getCss() {
  return `
  *,:after, :before{
    box-sizing: border-box;
    padding: 0;
  margin: 0;
  }
    @font-face {
        font-family: DotGothic16;
        src: url(data:font/woff2;charset=utf-8;base64,${DotGothic16}) format("truetype");
        font-weight: normal;
        font-style:  normal;
    }
    body {
        background: #272c35;
        width: 100vw;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        padding: 25px;
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        background: repeating-linear-gradient(transparent,transparent 2px,hsla(0,0%,47.8%,.9) 0,hsla(0,0%,47.8%,.9) 4px);
        padding: 25px;
    }
    
    .heading {
        font-family: 'DotGothic16', sans-serif;
        font-size: 100px;
        font-style: normal;
        color: #fff;
        line-height: 1.8;
        position: relative;

        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }
    .heading:before, .heading:after{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        content: attr(data-text);
    }
    .heading:before {
        text-shadow: 5px 5px #ec1eff;
        left: 0px;
    }
    .heading:after {
        text-shadow: -5px 7px #31ff1e;
        left: -1px;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="container">
            <div class="heading" data-text="${text}">${text}
        </div>
    </body>
</html>`;
}
