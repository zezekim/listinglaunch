"use client";
import { useRef } from "react";
import { GeneratedPackage } from "@/lib/types";
import { PropertyInput } from "@/lib/types";

interface Props {
  data: Pick<
    GeneratedPackage,
    "pdfHeadline" | "pdfDescription" | "pdfSpecs"
  >;
  property: PropertyInput;
}

export function PDFFlyer({ data, property }: Props) {
  const flyerRef = useRef<HTMLDivElement>(null);

  async function downloadPDF() {
    const { jsPDF } = await import("jspdf");
    const { default: html2canvas } = await import("html2canvas");

    if (!flyerRef.current) return;
    const canvas = await html2canvas(flyerRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#1a1a1a",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [612, 792],
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`listing-${property.address.replace(/[^a-z0-9]/gi, "-")}.pdf`);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={downloadPDF}
          className="text-xs px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded border border-amber-600 transition font-semibold"
        >
          Download PDF
        </button>
      </div>

      {/* Flyer Preview */}
      <div
        ref={flyerRef}
        style={{ fontFamily: "Georgia, serif" }}
        className="bg-stone-950 border border-stone-700 rounded-xl overflow-hidden"
      >
        {/* Photo strip */}
        {property.photos.length > 0 ? (
          <div className="grid grid-cols-3 h-48">
            {property.photos.map((p, i) => (
              <img
                key={i}
                src={p}
                className="w-full h-full object-cover"
              />
            ))}
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
            <span className="text-stone-600 text-sm">
              Add photos for flyer
            </span>
          </div>
        )}

        {/* Content */}
        <div className="p-8 space-y-5">
          {/* Header */}
          <div className="text-center space-y-1">
            <p className="text-amber-600 text-xs tracking-[4px] uppercase font-semibold">
              Twelve Rivers Realty
            </p>
            <h1 className="text-white text-2xl font-bold leading-tight">
              {data.pdfHeadline}
            </h1>
            <p className="text-stone-400 text-sm tracking-wider">
              {data.pdfSpecs}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-amber-700/40" />

          {/* Description */}
          <p className="text-stone-300 text-sm leading-relaxed text-center max-w-lg mx-auto">
            {data.pdfDescription}
          </p>

          {/* Divider */}
          <div className="border-t border-stone-700" />

          {/* Contact */}
          <div className="flex items-center justify-between text-xs text-stone-400">
            <div>
              <p className="text-white font-semibold">Paul Smith</p>
              <p>Partner · REALTOR® · GRI®</p>
            </div>
            <div className="text-right">
              <p>512.228.8074</p>
              <p>TwelveRiversRealty.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
