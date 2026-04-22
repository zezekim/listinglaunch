"use client";
import { GeneratedPackage, PropertyInput } from "@/lib/types";

interface Props {
  data: Pick<GeneratedPackage, "pdfHeadline" | "pdfDescription" | "pdfSpecs">;
  property: PropertyInput;
}

export function PDFFlyer({ data, property }: Props) {
  async function downloadPDF() {
    const { jsPDF } = await import("jspdf");

    const W = 612;
    const H = 792;
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });

    // Background
    pdf.setFillColor(15, 12, 10);
    pdf.rect(0, 0, W, H, "F");

    let y = 0;

    // Photo strip
    if (property.photos.length > 0) {
      const photoH = 210;
      const photoW = W / property.photos.length;
      property.photos.forEach((photo, i) => {
        const base64 = photo.split(",")[1];
        const ext = photo.startsWith("data:image/png") ? "PNG" : "JPEG";
        pdf.addImage(base64, ext, i * photoW, 0, photoW, photoH);
      });
      y = photoH;
    } else {
      pdf.setFillColor(35, 28, 22);
      pdf.rect(0, 0, W, 180, "F");
      y = 180;
    }

    y += 28;

    // Top amber rule
    pdf.setDrawColor(160, 100, 45);
    pdf.setLineWidth(1.5);
    pdf.line(50, y, W - 50, y);
    y += 18;

    // Brand
    pdf.setTextColor(160, 100, 45);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("TWELVE RIVERS REALTY  ·  AUSTIN, TEXAS", W / 2, y, { align: "center" });
    y += 22;

    // Headline
    pdf.setTextColor(255, 252, 248);
    pdf.setFontSize(21);
    pdf.setFont("helvetica", "bold");
    const headLines = pdf.splitTextToSize(data.pdfHeadline, 500);
    pdf.text(headLines, W / 2, y, { align: "center" });
    y += headLines.length * 26 + 8;

    // Specs
    pdf.setTextColor(175, 160, 140);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(data.pdfSpecs, W / 2, y, { align: "center" });
    y += 24;

    // Divider
    pdf.setDrawColor(80, 65, 45);
    pdf.setLineWidth(0.5);
    pdf.line(80, y, W - 80, y);
    y += 22;

    // Description
    pdf.setTextColor(210, 200, 188);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    const descLines = pdf.splitTextToSize(data.pdfDescription, 490);
    pdf.text(descLines, W / 2, y, { align: "center" });
    y += descLines.length * 16 + 24;

    // Bottom rule
    pdf.setDrawColor(55, 48, 40);
    pdf.setLineWidth(0.5);
    pdf.line(40, H - 85, W - 40, H - 85);

    // Contact left
    pdf.setTextColor(255, 252, 248);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.text("Paul Smith", 50, H - 62);
    pdf.setTextColor(155, 140, 122);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text("Partner · REALTOR® · GRI®", 50, H - 47);

    // Contact right
    pdf.setTextColor(155, 140, 122);
    pdf.setFontSize(9);
    pdf.text("512.228.8074", W - 50, H - 62, { align: "right" });
    pdf.text("TwelveRiversRealty.com", W - 50, H - 47, { align: "right" });

    pdf.save(`listing-${property.address.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf`);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={downloadPDF}
          className="px-5 py-2.5 bg-amber-700 hover:bg-amber-600 text-white text-sm font-bold rounded-lg transition"
        >
          Download PDF
        </button>
      </div>

      {/* On-screen flyer preview */}
      <div
        style={{ fontFamily: "Georgia, serif", background: "#0f0c0a" }}
        className="border border-stone-700 rounded-xl overflow-hidden"
      >
        {property.photos.length > 0 ? (
          <div
            className="grid h-48"
            style={{ gridTemplateColumns: `repeat(${property.photos.length}, 1fr)` }}
          >
            {property.photos.map((p, i) => (
              <img key={i} src={p} className="w-full h-full object-cover" />
            ))}
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
            <span className="text-stone-600 text-sm">Add photos to include in flyer</span>
          </div>
        )}

        <div className="p-7 space-y-4">
          <div className="border-t border-amber-700/50 pt-4 text-center space-y-1">
            <p className="text-amber-600 text-[10px] tracking-[5px] uppercase font-semibold">
              Twelve Rivers Realty · Austin, Texas
            </p>
            <h1 className="text-white text-xl font-bold leading-snug">{data.pdfHeadline}</h1>
            <p className="text-stone-400 text-sm tracking-wide">{data.pdfSpecs}</p>
          </div>

          <div className="border-t border-stone-700/60" />

          <p className="text-stone-300 text-sm leading-relaxed text-center max-w-lg mx-auto">
            {data.pdfDescription}
          </p>

          <div className="border-t border-stone-800 pt-4 flex items-center justify-between text-xs">
            <div>
              <p className="text-white font-semibold">Paul Smith</p>
              <p className="text-stone-500">Partner · REALTOR® · GRI®</p>
            </div>
            <div className="text-right text-stone-500">
              <p>512.228.8074</p>
              <p>TwelveRiversRealty.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
