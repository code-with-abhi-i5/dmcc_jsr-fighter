import React, { useRef, useState, useEffect } from "react";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import logoImg from "../assets/logo.jpg";

export default function PlayerCard({ data }) {
  const cardRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (!data.playerPhotoUrl) return;
    const fetchImg = async () => {
      try {
        const res = await fetch(data.playerPhotoUrl);
        const blob = await res.blob();
        setImgSrc(URL.createObjectURL(blob));
      } catch (e) {
        console.error("Blob fetch failed", e);
        setImgSrc(data.playerPhotoUrl); // fallback
      }
    };
    fetchImg();
  }, [data.playerPhotoUrl]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const toastId = toast.loading("Downloading card...");
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `${data.playerName}_DMCC_Card.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Card downloaded successfully!", { id: toastId });
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Error: " + (err.message || String(err)), { id: toastId });
    }
  };



  return (
    <div className="mt-8 animate-fade-in">
      {/* The Card */}
      <div
        ref={cardRef}
        style={{
          width: "400px",
          maxWidth: "100%",
          margin: "0 auto",
          background: "linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          borderRadius: "24px",
          overflow: "hidden",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative top accent */}
        <div
          style={{
            height: "6px",
            background: "linear-gradient(90deg, #10b981, #059669, #10b981)",
            width: "100%",
          }}
        />

        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage:
              "radial-gradient(circle at 20% 80%, #10b981 1px, transparent 1px), radial-gradient(circle at 80% 20%, #10b981 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        {/* Header with Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "20px 24px 12px",
            position: "relative",
          }}
        >
          <img
            src={logoImg}
            alt="DMCC Logo"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "12px",
              objectFit: "cover",
              border: "2px solid rgba(16, 185, 129, 0.4)",
            }}
            crossOrigin="anonymous"
          />
          <div style={{ display: "block", textAlign: "left", flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "900",
                color: "#f8fafc",
                letterSpacing: "0.5px",
                lineHeight: "1.2",
                marginBottom: "4px",
                whiteSpace: "nowrap",
              }}
            >
              DMCC & JSR FIGHTER LEAGUE
            </div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#e2e8f0",
                letterSpacing: "1px",
                lineHeight: "1.2",
                marginBottom: "4px",
              }}
            >
              SESSION 02 (2026)
            </div>
            <div
              style={{
                fontSize: "9px",
                fontWeight: "700",
                color: "#10b981",
                letterSpacing: "2px",
                textTransform: "uppercase",
                lineHeight: "1.2",
              }}
            >
              PLAYER ID CARD
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            margin: "0 24px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)",
          }}
        />

        {/* Player Photo + Name Section */}
        <div
          style={{
            textAlign: "center",
            padding: "20px 24px 12px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "3px solid #10b981",
              boxShadow: "0 8px 32px rgba(16, 185, 129, 0.2)",
              margin: "0 auto 12px",
            }}
          >
            <img
              src={imgSrc || logoImg}
              alt={data.playerName}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              crossOrigin="anonymous"
            />
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#f8fafc",
              textAlign: "center",
              letterSpacing: "0.5px",
              lineHeight: "1.2",
              marginBottom: "10px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {data.playerName}
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "8px",
              padding: "4px 14px",
              fontSize: "13px",
              fontWeight: "700",
              color: "#10b981",
              letterSpacing: "1px",
              lineHeight: "1.2",
              margin: "0 auto",
            }}
          >
            {data.registrationId}
          </div>
        </div>

        {/* Info Grid */}
        <div
          style={{
            padding: "8px 24px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          <InfoItem label="Jersey Number" value={`#${data.jerseyNumber}`} />
          <InfoItem label="Jersey Size" value={data.jerseySize} />
          <InfoItem label="Phone" value={data.phoneNumber} />
          <InfoItem
            label="Player Role"
            value={data.role || "N/A"}
          />
          <div style={{ gridColumn: "1 / -1" }}>
            <InfoItem label="Address" value={data.address} />
          </div>
        </div>


      </div>

      {/* Download Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 active:scale-95"
        >
          <Download className="w-5 h-5" />
          Download Card
        </button>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div
      style={{
        background: "rgba(30, 41, 59, 0.8)",
        border: "1px solid rgba(51, 65, 85, 0.6)",
        borderRadius: "12px",
        padding: "6px 10px",
      }}
    >
      <div
        style={{
          fontSize: "8px",
          fontWeight: "700",
          color: "#10b981",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          marginBottom: "2px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "11px",
          fontWeight: "600",
          color: "#e2e8f0",
          lineHeight: "1.4",
          wordBreak: "break-word",
        }}
      >
        {value || "N/A"}
      </div>
    </div>
  );
}
