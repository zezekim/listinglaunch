export interface PropertyInput {
  address: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  highlights: string;
  propertyType: "residential" | "commercial" | "land";
  photos: string[]; // base64 data URLs
}

export interface GeneratedPackage {
  email: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  pdfHeadline: string;
  pdfDescription: string;
  pdfSpecs: string;
  videoScript: string;
}
