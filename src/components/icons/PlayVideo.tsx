const PlayVideo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
    >
      <g filter="url(#filter0_b_2508_6285)">
        <rect width={60} height={60} rx={30} fill="#3E3E3E" fillOpacity="0.4" />
        <path
          d="M24 20L40 30.5L24 41V20Z"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_2508_6285"
          x={-10}
          y={-10}
          width={80}
          height={80}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation={5} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2508_6285"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2508_6285"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default PlayVideo;
