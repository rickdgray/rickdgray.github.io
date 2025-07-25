import fs from 'fs';
import TextToSVG = require('text-to-svg');

const textToSVG = TextToSVG.loadSync('./fonts/CascadiaCode-Bold.ttf');

const options = {
    anchor: 'middle',
} as const;

const r_path = textToSVG.getD('r', { ...options, x: 2, y: 44 });
const gt_path = textToSVG.getD('>', { ...options, x: 44, y: 51 });

let svg = `
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
  <style>
    .cursor {
      fill: #f03131;
      animation: blink 1.4s infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  </style>

 <g class="layer" display="inline">
  <rect fill="#1b1f24" height="100" id="background" width="100"/>
  <path id="r" fill="#e5e7eb" d="${r_path}" />
  <path id="gt" fill="#e5e7eb" d="${gt_path}" />
  <rect class="cursor" height="60" id="cursor" width="4" x="90" y="20"/>
 </g>
</svg>
`;


fs.writeFileSync('./dist/logo.svg', svg);
