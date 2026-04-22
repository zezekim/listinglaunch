"use client";
import { useState, useRef } from "react";
import { PropertyInput } from "@/lib/types";

interface Props {
  onSubmit: (data: PropertyInput) => void;
  loading: boolean;
}

export function PropertyForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<PropertyInput>({
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    highlights: "",
    propertyType: "residential",
    photos: [],
  });

  const fileRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).slice(0, 3);
    const readers = files.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((photos) =>
      setForm((prev) => ({ ...prev, photos }))
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  const inputClass =
    "w-full px-4 py-2.5 bg-stone-900 border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-amber-600 transition text-sm";
  const labelClass = "block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Property Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="7207 Mesa Drive, Austin TX 78731"
          required
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>List Price</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="$975,000"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Property Type</label>
          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Beds</label>
          <input
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            placeholder="4"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Baths</label>
          <input
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            placeholder="3"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Sq Ft</label>
          <input
            name="sqft"
            value={form.sqft}
            onChange={handleChange}
            placeholder="2,400"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Key Highlights</label>
        <textarea
          name="highlights"
          value={form.highlights}
          onChange={handleChange}
          placeholder="Pool, hill country views, open floor plan, updated kitchen, 2-car garage, walking distance to Barton Springs..."
          required
          rows={3}
          className={inputClass + " resize-none"}
        />
      </div>

      <div>
        <label className={labelClass}>Listing Photos (up to 3)</label>
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-stone-700 rounded-lg p-4 text-center cursor-pointer hover:border-amber-600 transition"
        >
          {form.photos.length > 0 ? (
            <div className="flex gap-2 justify-center">
              {form.photos.map((p, i) => (
                <img
                  key={i}
                  src={p}
                  className="h-16 w-16 object-cover rounded"
                />
              ))}
            </div>
          ) : (
            <p className="text-stone-500 text-sm">
              Click to upload photos (optional)
            </p>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handlePhotos}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-amber-700 hover:bg-amber-600 disabled:bg-stone-700 disabled:cursor-not-allowed text-white font-bold rounded-lg tracking-wide transition text-sm uppercase"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Generating Package...
          </span>
        ) : (
          "Generate Listing Package"
        )}
      </button>
    </form>
  );
}
