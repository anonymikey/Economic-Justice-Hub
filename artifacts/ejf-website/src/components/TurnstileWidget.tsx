import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: {
        sitekey: string;
        action?: string;
        callback?: (token: string) => void;
        "expired-callback"?: () => void;
        "error-callback"?: () => void;
      }) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

interface Props {
  action: string;
  onVerify: (token: string) => void;
  onExpire: () => void;
}

export default function TurnstileWidget({ action, onVerify, onExpire }: Props) {
  const elementRef = useRef<HTMLDivElement>(null);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  useEffect(() => {
    if (!siteKey || !elementRef.current) return;
    const scriptId = "cloudflare-turnstile-script";
    const render = () => {
      if (!window.turnstile || !elementRef.current) return;
      window.turnstile.render(elementRef.current, {
        sitekey: siteKey,
        action,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": onExpire,
      });
    };
    const existing = document.getElementById(scriptId);
    if (existing) {
      render();
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", render);
    document.head.appendChild(script);
    return () => script.removeEventListener("load", render);
  }, [action, onExpire, onVerify, siteKey]);

  if (!siteKey) return null;
  return <div ref={elementRef} className="min-h-[65px]" aria-label="Security verification" />;
}