"use client";

import { useRef, useState } from "react";

type Bucket = "community-uploads" | "avatars";

/**
 * File picker that uploads via POST /api/upload and writes the returned URL
 * into a hidden input (so it rides with a regular server action FormData
 * submission). Keeps the rest of the form flow exactly as before.
 */
export default function ImageUploader({
  bucket,
  name = "image_url",
  initialUrl = null,
  label = "Add photo",
  onUploaded,
}: {
  bucket: Bucket;
  /** Hidden input name that carries the uploaded URL on submit. */
  name?: string;
  initialUrl?: string | null;
  label?: string;
  onUploaded?: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string | null>(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("bucket", bucket);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? "Upload failed");
      setUrl(payload.url);
      onUploaded?.(payload.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={url ?? ""} />
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handlePick}
        className="hidden"
      />

      {url ? (
        <div className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt=""
            className="max-h-64 w-full rounded-2xl border border-white/10 object-cover"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70 hover:bg-white/10 disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Replace"}
            </button>
            <button
              type="button"
              onClick={() => setUrl(null)}
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-rose-300/80 hover:text-rose-300"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-full border border-dashed border-white/20 bg-black/30 px-4 py-2 text-xs text-white/70 hover:bg-black/50 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : `📷 ${label}`}
        </button>
      )}

      {error && <p className="text-xs text-rose-300">{error}</p>}
    </div>
  );
}
