import { useId } from "react";

import { type IconProps } from "@/libs/types";

export default function LoadingIcon({ size = 24, ...rest }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 36 36"
      fill="currentColor"
      aria-hidden
      {...rest}
    >
      <defs>
        <linearGradient x1="0%" y1="100%" x2="100%" y2="100%" id={gradientId}>
          <stop stopColor="currentColor" stopOpacity="0" offset="0%"></stop>
          <stop
            stopColor="currentColor"
            stopOpacity="0.50"
            offset="39.9430698%"
          ></stop>
          <stop stopColor="currentColor" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect
          fillOpacity="0.01"
          fill="none"
          x="0"
          y="0"
          width={size}
          height={size}
        ></rect>
        <path
          d="M34,18 C34,9.163444 26.836556,2 18,2 C11.6597233,2 6.18078805,5.68784135 3.59122325,11.0354951"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  );
}
