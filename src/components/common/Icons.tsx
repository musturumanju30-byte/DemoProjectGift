import React from "react";

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5c0-.988.275-1.5 1.5-1.5h2.5V2.193C16.634 2.135 15.58 2 14.398 2 11.398 2 9.198 3.84 9.198 7.2v2.31h-3v3.98h3v8.01z" />
  </svg>
);

export const TwitterXIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.88 0-1.6.72-1.6 1.6 0 .88.72 1.6 1.6 1.6.88 0 1.6-.72 1.6-1.6 0-.88-.72-1.6-1.6-1.6z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.51 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.42 1.01 2.58c.13.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
  </svg>
);

/* Payment Badges */
export const VisaBadge: React.FC<{ className?: string }> = ({ className = "h-5 w-auto" }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
    <path
      d="M19.5 21.5L22 10.5H24.5L22 21.5H19.5ZM17.2 10.5L14.8 18.2L14.5 16.8C14 15.1 12.5 13.3 10.8 12.3L13 21.5H15.6L19.7 10.5H17.2ZM33.2 18.1C33.2 15.2 29.3 15 29.3 13.8C29.3 13.4 29.7 12.9 30.7 12.8C31.2 12.7 32.7 12.7 34.2 13.4L34.7 11.2C34 10.9 33.1 10.7 32 10.7C29.2 10.7 27.2 12.2 27.2 14.3C27.2 17.5 31.6 17.3 31.6 19.3C31.6 19.9 31 20.4 29.9 20.4C28.5 20.4 26.8 19.8 26 19.3L25.4 21.6C26.3 22 27.8 22.3 29.3 22.3C32.3 22.3 33.2 20.8 33.2 18.1ZM39.8 21.5L41.8 10.5H39.8C39.2 10.5 38.6 10.9 38.4 11.4L34.8 21.5H37.4L37.9 20H40.6L40.9 21.5H43.5L41.3 10.5H39.8M38.6 18.2L39.7 13.4L40.3 18.2H38.6ZM10.5 10.5H6.5L6.4 10.7C9.5 11.5 12 13.5 12.9 15.8L12 11.2C11.8 10.7 11.2 10.5 10.5 10.5Z"
      fill="#1434CB"
    />
  </svg>
);

export const MastercardBadge: React.FC<{ className?: string }> = ({ className = "h-5 w-auto" }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
    <circle cx="20" cy="16" r="7" fill="#EB001B" />
    <circle cx="28" cy="16" r="7" fill="#F79E1B" fillOpacity="0.85" />
  </svg>
);

export const RuPayBadge: React.FC<{ className?: string }> = ({ className = "h-5 w-auto" }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
    <path d="M12 10H19C21.2 10 22.5 11.1 22.5 12.8C22.5 14.5 21.2 15.6 19 15.6H15V22H12V10ZM15 13.3H18.6C19.2 13.3 19.6 13.1 19.6 12.8C19.6 12.5 19.2 12.3 18.6 12.3H15V13.3Z" fill="#097938" />
    <path d="M25 15.5H27.5V17H25V19.5H27.8V21.5H22.5V10H27.8V12H25V15.5Z" fill="#0C4393" />
    <path d="M31 10L36 16L31 22H34.5L39.5 16L34.5 10H31Z" fill="#F37021" />
  </svg>
);

export const UpiBadge: React.FC<{ className?: string }> = ({ className = "h-5 w-auto" }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
    <path d="M16 11L21 21H17.5L14.8 15.5L13.8 21H11L13.5 11H16Z" fill="#747474" />
    <path d="M21.5 11H26.5C28.5 11 29.8 12.2 29.8 13.8C29.8 15.5 28.5 16.7 26.5 16.7H23.8V21H21.5V11ZM23.8 14.8H26C26.8 14.8 27.4 14.4 27.4 13.8C27.4 13.2 26.8 12.8 26 12.8H23.8V14.8Z" fill="#097938" />
    <path d="M32 11H34.5V21H32V11Z" fill="#F37021" />
    <path d="M37 11L41 16L37 21H39.5L43.5 16L39.5 11H37Z" fill="#0C4393" />
  </svg>
);

export const NetBankingBadge: React.FC<{ className?: string }> = ({ className = "h-5 w-auto" }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
    <path d="M24 8L12 14V16H36V14L24 8ZM14 18V23H17V18H14ZM20 18V23H23V18H20ZM25 18V23H28V18H25ZM31 18V23H34V18H31ZM11 24V26H37V24H11Z" fill="#1E3A8A" />
  </svg>
);

export const AmexBadge: React.FC<{ className?: string }> = ({ className = "h-5 w-auto" }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#016FD0" />
    <path
      d="M12 21L14.5 11H17L19.5 21H17.2L16.8 19H14.7L14.3 21H12ZM15.1 17.2H16.4L15.8 13.5L15.1 17.2ZM20.2 21V11H23L24.8 17.2L26.6 11H29.4V21H27.5V14.2L25.6 20.8H24L22.1 14.2V21H20.2ZM30.5 21V11H36.2V13H32.6V15H35.8V17H32.6V19H36.2V21H30.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const GoogleIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

