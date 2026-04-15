import { useEffect } from "react";
import QRCode from "qrcode";
import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
}

export function ShareModal({ isOpen, onClose, code }: ShareModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/?code=${code}`
      : "";

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && shareUrl) {
      QRCode.toDataURL(shareUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#0a243a",
          light: "#fbf8f3",
        },
      })
        .then((url) => {
          setQrCodeDataUrl(url);
        })
        .catch((err) => {
          console.error("Error generating QR code:", err);
        });
    }
  }, [isOpen, shareUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my Lotería game!",
          text: `Join my Lotería game with code: ${code}`,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled or failed:", err);
      }
    } else {
      // Fallback to copy if native share not available
      handleCopyLink();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 "
      onClick={onClose}
    >
      <div
        className="bg-loteria-cream rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-loteria-blue hover:text-loteria-orange transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center mt-4">
          <h2 className="text-3xl font-bold text-loteria-blue mb-2">
            Share Game
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Share this code with your friends to join the game
          </p>

          {/* Game Code Display */}
          <div className="bg-loteria-blue text-white px-6 py-3 rounded-lg mb-6">
            <span
              className="text-3xl font-bold tracking-widest"
              style={{ fontFamily: "Nova Mono, monospace" }}
            >
              {code}
            </span>
          </div>

          {/* QR Code */}
          {qrCodeDataUrl && (
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
              <img src={qrCodeDataUrl} alt="QR Code" className="w-64 h-64" />
              <p className="text-xs text-gray-500 text-center mt-2">
                Scan to join instantly
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            {/* Native Share Button */}
            {typeof navigator !== "undefined" && "share" in navigator && (
              <button
                onClick={handleNativeShare}
                className="w-full bg-loteria-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
              >
                <svg
                  className="w-6 h-6"
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
              </button>
            )}

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="w-full bg-loteria-blue hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
            >
              {copied ? (
                <>
                  <svg
                    className="w-6 h-6"
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
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          {/* Link Display */}
          <div className="w-full mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-xs text-gray-600 text-center break-all">
              {shareUrl}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
