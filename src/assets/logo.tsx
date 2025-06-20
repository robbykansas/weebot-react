import React from "react";

const MalLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="svg1"
    width="20"
    height="20"
    version="1.1"
    viewBox="0 0 256 256"
  >
    <g
      id="g1"
      fillOpacity="1"
      strokeLinejoin="round"
      paintOrder="stroke fill markers"
    >
      <path
        id="rect2"
        fill="#2e51a2"
        strokeWidth="1"
        d="M0 0h256v256H0z"
        opacity="1"
      ></path>
      <path
        id="path1"
        fill="#fff"
        d="M30.639 88.41v68.706h17.76v-41.91l15.47 19.773 16.678-19.773v41.91h17.76V88.41h-17.76L63.87 109.823 48.4 88.41Z"
      ></path>
      <path
        id="path1-1"
        fill="#fff"
        d="M182.498 88.41v68.706h39.08l3.783-14.657h-25.103v-54.05Z"
      ></path>
      <path
        id="path1-1-8"
        fill="#fff"
        d="M149.652 88.41c-21.643 0-35.067 10.21-39.37 25.392-4.199 14.818.342 34.371 10.288 53.789l14.857-10.475s-7.064-9.217-8.394-23.035h21.984v23.035h19.734v-51.68h-19.734v14.967H130.8c1.717-11.197 8.295-17.308 15.469-17.308h25.816l-5.123-14.686z"
      ></path>
    </g>
  </svg>
);

const AnilistLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
    <desc>Anime and manga tracking website</desc>
    <path fill="#1e2630" d="M0 0h20v20H0"></path>
    <path
      fill="#02a9ff"
      d="M321.92 323.27V136.6c0-10.698-5.887-16.602-16.558-16.602h-36.433c-10.672 0-16.561 5.904-16.561 16.602v88.651c0 2.497 23.996 14.089 24.623 16.541 18.282 71.61 3.972 128.92-13.359 131.6 28.337 1.405 31.455 15.064 10.348 5.731 3.229-38.209 15.828-38.134 52.049-1.406.31.317 7.427 15.282 7.87 15.282h85.545c10.672 0 16.558-5.9 16.558-16.6v-36.524c0-10.698-5.886-16.602-16.558-16.602z"
    ></path>
    <path
      fill="#fefefe"
      d="M170.68 120 74.999 393h74.338l16.192-47.222h80.96L262.315 393h73.968l-95.314-273zm11.776 165.28 23.183-75.629 25.393 75.629z"
    ></path>
  </svg>
);

export { MalLogo, AnilistLogo }
