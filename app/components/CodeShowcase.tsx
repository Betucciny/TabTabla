import { useState } from "react";

interface CodeShowcaseProps {
  code: string;
}

export default function CodeShowcase({ code }: CodeShowcaseProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/?code=${code}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my Lotería game!",
          text: `Join my Lotería game with code: ${code}`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        console.log("Share cancelled or failed:", err);
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex justify-center">
          <pre className="text-white text-3xl leading-relaxed">
            <code className="code-font">{code}</code>
          </pre>
        </div>
        <button
          onClick={handleShare}
          className="bg-loteria-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center gap-2"
          title="Share game link"
        >
          {copied ? (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
