import React, { useRef } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import logoImg from "../assets/logo.jpg";

export default function PlayerCard({ data }) {
  const cardRef = useRef(null);

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
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `${data.playerName}_DMCC_Card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const statusColor =
    data.status === "approved"
      ? "#10b981"
      : data.status === "rejected"
      ? "#f43f5e"
      : "#3b82f6";

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
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "800",
                color: "#f8fafc",
                letterSpacing: "2px",
                lineHeight: "1.2",
              }}
            >
              DMCC JSR FIGHTER
            </div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: "600",
                color: "#10b981",
                letterSpacing: "3px",
                textTransform: "uppercase",
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 24px 12px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "3px solid #10b981",
              boxShadow: "0 8px 32px rgba(16, 185, 129, 0.2)",
              marginBottom: "12px",
            }}
          >
            <img
              src={data.playerPhotoUrl}
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
              marginBottom: "4px",
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
            }}
          >
            {data.registrationId}
          </div>
        </div>

        {/* Info Grid */}
        <div
          style={{
            padding: "12px 24px 8px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <InfoItem label="Jersey Number" value={`#${data.jerseyNumber}`} />
          <InfoItem label="Jersey Size" value={data.jerseySize} />
          <InfoItem label="Phone" value={data.phoneNumber} />
          <InfoItem
            label="Registered"
            value={formatDate(data.createdAt)}
          />
          <div style={{ gridColumn: "1 / -1" }}>
            <InfoItem label="Address" value={data.address} />
          </div>
        </div>

        {/* Status Badge */}
        <div
          style={{
            padding: "16px 24px 24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 28px",
              borderRadius: "14px",
              background: `${statusColor}18`,
              border: `2px solid ${statusColor}50`,
              fontSize: "15px",
              fontWeight: "800",
              color: statusColor,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: statusColor,
                boxShadow: `0 0 8px ${statusColor}`,
              }}
            />
            {data.status}
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
        padding: "10px 14px",
      }}
    >
      <div
        style={{
          fontSize: "9px",
          fontWeight: "700",
          color: "#10b981",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "13px",
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
