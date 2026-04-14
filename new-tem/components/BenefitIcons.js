/** Minimal stroke icons for rider benefits — no emoji. */

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 32 32",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

export function IconHomeCharging(props) {
  return (
    <svg {...iconProps} {...props}>
      <path
        d="M18.5 3L11 17.5h5.5L13 29l12.5-17h-6.5L25 3h-6.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 27h8M5 23h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function IconRange(props) {
  return (
    <svg {...iconProps} {...props}>
      <path
        d="M3 24c4-10 8-14 13-14s7 4 11 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 24h26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="8" cy="22" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="22" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 6v4M14 8h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconAiSafety(props) {
  return (
    <svg {...iconProps} {...props}>
      <path
        d="M16 4.5L6.5 9v8.5c0 5.2 4.2 9.5 9.5 9.5s9.5-4.3 9.5-9.5V9L16 4.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 13v6M12.5 16h7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="11" cy="12" r="1.25" fill="currentColor" />
      <circle cx="21" cy="12" r="1.25" fill="currentColor" />
      <path
        d="M11 12c1.5-2 3.5-3 5-3s3.5 1 5 3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconFastCharging(props) {
  return (
    <svg {...iconProps} {...props}>
      <path
        d="M5 8h11v16H5V8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 8l11 8-11 8V8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 16h10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
