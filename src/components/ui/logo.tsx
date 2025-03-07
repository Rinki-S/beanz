"use client";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34zM6 15l.004-2.116a6.995 6.995 0 0 0 12-4.88L18 8a7 7 0 0 0-12.004 4.89L6 15zm2-2h8v2H8v-2zm0-3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1z"
          fill="currentColor"
        />
      </svg>
      <span className="font-bold text-xl">Beanz</span>
    </div>
  );
}
