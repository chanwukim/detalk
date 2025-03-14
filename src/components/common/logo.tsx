import { type IconProps } from "@/libs/types";

export default function Logo({ size = 24, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...rest}
    >
      <path d="M21.75 11.625C21.7472 14.1106 20.7586 16.4936 19.0011 18.2511C17.2435 20.0087 14.8605 20.9973 12.375 21H4.49996C4.10214 21 3.50627 21.0813 3.22496 20.8C2.94366 20.5187 2.99996 19.8978 2.99996 19.5V11.625C2.99996 9.1386 3.98768 6.75403 5.74584 4.99587C7.50399 3.23772 9.88856 2.25 12.375 2.25C14.8614 2.25 17.2459 3.23772 19.0041 4.99587C20.7622 6.75403 21.75 9.1386 21.75 11.625Z" />
    </svg>
  );
}
