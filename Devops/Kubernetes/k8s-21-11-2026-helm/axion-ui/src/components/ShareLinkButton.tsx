import { useState } from 'react';
import { Link, Check } from 'lucide-react';

interface ShareLinkButtonProps {
  className?: string;
  deviceName?: string;
}

export function ShareLinkButton({ className = '', deviceName }: ShareLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className={`flex items-center justify-center gap-2 px-4 py-2 bg-[#171717] hover:bg-theme-deep border border-[#404040] hover:border-theme-base/50 text-white rounded-md transition-all font-bold text-xs tracking-wider shadow-md ${copied ? 'bg-theme-base border-theme-base' : ''} ${className}`}
    >
      {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
      <span>{copied ? 'VIEW SECURED!' : `COPY LIVE VIEW${deviceName ? `: ${deviceName}` : ''}`}</span>
    </button>
  );
}
