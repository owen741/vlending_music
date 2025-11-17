import svgPaths from "../imports/svg-5u0p90uvmj";

/**
 * VLENDING 로고 심볼 - 그레이스케일 버전
 * no-image 케이스에서 사용
 */
interface VlendingSymbolProps {
  className?: string;
}

export function VlendingSymbol({ className = "w-1/5 h-1/5" }: VlendingSymbolProps) {
  return (
    <div className={className}>
      <svg className="block size-full" fill="none" viewBox="0 0 513 408" preserveAspectRatio="xMidYMid meet">
        <g clipPath="url(#clip0_vlending_symbol)" opacity="0.4">
          <path d={svgPaths.p35b78600} fill="url(#gradient0_vlending)" />
          <path d={svgPaths.p3f283500} fill="#9CA3AF" />
          <path d={svgPaths.p6977a40} fill="#9CA3AF" />
          <path d={svgPaths.p3c659100} fill="#6B7280" />
          <path d={svgPaths.p18924500} fill="url(#gradient1_vlending)" />
          <path d={svgPaths.p2fcbf380} fill="url(#gradient2_vlending)" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="gradient0_vlending" x1="0.0373514" x2="117.547" y1="203.746" y2="203.746">
            <stop stopColor="#E5E7EB" />
            <stop offset="0.27" stopColor="#D1D5DB" />
            <stop offset="0.62" stopColor="#C4C8CC" />
            <stop offset="1" stopColor="#C0C4C8" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="gradient1_vlending" x1="224.639" x2="512.084" y1="203.746" y2="203.746">
            <stop stopColor="#9CA3AF" />
            <stop offset="0.5" stopColor="#6B7280" />
            <stop offset="1" stopColor="#4B5563" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="gradient2_vlending" x1="223.444" x2="418.435" y1="201.879" y2="201.879">
            <stop stopColor="#9CA3AF" />
            <stop offset="0.5" stopColor="#6B7280" />
            <stop offset="1" stopColor="#D1D5DB" />
          </linearGradient>
          <clipPath id="clip0_vlending_symbol">
            <rect fill="white" height="407.476" width="512.019" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
