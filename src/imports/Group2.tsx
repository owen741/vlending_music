import svgPaths from "./svg-wfonj3c2nl";

/**
 * @figmaAssetKey 6e6feaab0d0b1bbb8b3120bf0d06f2587c85cf53
 */
function Group({ className, textColor = "#476489" }: { className?: string; textColor?: string }) {
  return (
    <div className={className}>
      <div className="absolute bottom-[0.86%] contents left-0 right-0 top-[0.88%]">
        <div className="absolute bottom-[0.86%] left-0 right-[70.47%] top-[0.88%]" data-name="Group">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 136 112">
            <g id="Group">
              <path d={svgPaths.p12b1720} fill="url(#paint0_linear_15_961)" id="Vector" />
              <path d={svgPaths.p2478e40} fill="var(--fill-0, #3FBCD1)" id="Vector_2" />
              <path d={svgPaths.p1d64a3f1} fill="var(--fill-0, #3FBCD1)" id="Vector_3" />
              <path d={svgPaths.p2e17f780} fill="var(--fill-0, #2CABBE)" id="Vector_4" />
              <path d={svgPaths.p35914180} fill="url(#paint1_linear_15_961)" id="Vector_5" />
              <path d={svgPaths.p16504100} fill="url(#paint2_linear_15_961)" id="Vector_6" />
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_15_961" x1="0" x2="31.1813" y1="55.5124" y2="55.5124">
                <stop stopColor="#D1EBF3" />
                <stop offset="0.27" stopColor="#C3E5EF" />
                <stop offset="0.62" stopColor="#B7E0EC" />
                <stop offset="1" stopColor="#B4DFEC" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_15_961" x1="59.5948" x2="135.835" y1="55.5124" y2="55.5124">
                <stop stopColor="#E74191" />
                <stop offset="0.03" stopColor="#E14191" />
                <stop offset="0.21" stopColor="#BF4797" />
                <stop offset="0.4" stopColor="#A54C9B" />
                <stop offset="0.59" stopColor="#924F9E" />
                <stop offset="0.79" stopColor="#8651A0" />
                <stop offset="1" stopColor="#8352A1" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_15_961" x1="59.2747" x2="110.999" y1="55.0095" y2="55.0095">
                <stop stopColor="#129FC8" />
                <stop offset="0.17" stopColor="#2EB0D2" />
                <stop offset="0.36" stopColor="#48C0DC" />
                <stop offset="0.57" stopColor="#5BCBE3" />
                <stop offset="0.77" stopColor="#67D2E7" />
                <stop offset="1" stopColor="#6BD5E9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-[26.94%] left-[32.84%] right-0 top-[26.97%]" data-name="Group">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 309 53">
            <g id="Group">
              <path d={svgPaths.p21de2f80} fill={textColor} id="Vector" />
              <path d={svgPaths.p25ac2300} fill={textColor} id="Vector_2" />
              <path d={svgPaths.pc693700} fill={textColor} id="Vector_3" />
              <path d={svgPaths.p3b691000} fill={textColor} id="Vector_4" />
              <path d={svgPaths.p3d81e200} fill={textColor} id="Vector_5" />
              <path d={svgPaths.p3c0a9a00} fill={textColor} id="Vector_6" />
              <path d={svgPaths.p34947f00} fill={textColor} id="Vector_7" />
              <path d={svgPaths.p2be1e100} fill={textColor} id="Vector_8" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Group1({ textColor }: { textColor?: string }) {
  return <Group className="relative size-full" textColor={textColor} />;
}