"use client";

import React, { useRef, useState } from 'react';
import { UploadCloud, CheckCircle, Loader2, Trash2, Image as ImageIcon, ExternalLink, RefreshCw, Star } from 'lucide-react';
import { AdminButton, AdminInput } from './ui';

interface SingleImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export function AdminSingleImageUpload({
  value,
  onChange,
  label = 'Cover Image',
  placeholder = 'No image selected'
}: SingleImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (json?.success && json?.data?.secure_url) {
        onChange(json.data.secure_url);
      } else {
        setUploadError(json?.error || 'Failed to upload to Cloudinary');
      }
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      setUploadError(err?.message || 'Network error uploading to Cloudinary');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange('');
    setUploadError(null);
  };

  const isCloudinary = value?.includes('cloudinary.com');

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-medium text-zinc-300 flex items-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5 text-amber-400" />
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          className="text-[0.68rem] font-mono text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
        >
          {showManualInput ? 'Hide manual URL' : 'Enter URL manually'}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload and Preview Container */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3.5 space-y-3">
        {value ? (
          <div className="space-y-3">
            {/* Image Preview Box */}
            <div className="relative group aspect-[16/9] max-h-48 w-full rounded-md border border-zinc-800 overflow-hidden bg-zinc-900 flex items-center justify-center">
              <img
                src={value}
                alt="Selected preview"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/acryglo_cast_acrylic_sheets.webp';
                }}
              />

              {isUploading && (
                <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-2 text-white">
                  <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
                  <span className="font-mono text-xs font-medium">Uploading to Cloudinary...</span>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                {isCloudinary ? (
                  <span className="rounded bg-emerald-950/90 text-emerald-400 border border-emerald-600/50 px-2 py-0.5 font-mono text-[0.65rem] font-medium flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Cloudinary CDN
                  </span>
                ) : (
                  <span className="rounded bg-zinc-900/90 text-zinc-300 border border-zinc-700 px-2 py-0.5 font-mono text-[0.65rem]">
                    Local / Custom URL
                  </span>
                )}
              </div>

              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <AdminButton
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={handleSelectFileClick}
                  disabled={isUploading}
                  className="bg-zinc-900/90"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Change File
                </AdminButton>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 rounded bg-red-600/90 hover:bg-red-600 text-white transition-colors"
                  title="Remove image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <AdminButton
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleSelectFileClick}
                  disabled={isUploading}
                  className="shrink-0"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-3.5 w-3.5 text-amber-400" /> Select New File
                    </>
                  )}
                </AdminButton>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>

              {value && (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.68rem] font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1 truncate max-w-[200px]"
                  title={value}
                >
                  <span className="truncate">{value.split('/').pop()}</span>
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              )}
            </div>
          </div>
        ) : (
          /* Empty / Upload Prompt State */
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors text-center">
            <div className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
              <UploadCloud className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-xs font-mono text-zinc-300 font-medium mb-1">
              Select an image from your computer
            </p>
            <p className="text-[0.7rem] font-mono text-zinc-500 mb-3.5 max-w-xs">
              Image will automatically upload to Cloudinary and link to database
            </p>

            <AdminButton
              type="button"
              onClick={handleSelectFileClick}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading to Cloudinary...
                </>
              ) : (
                <>
                  <UploadCloud className="h-3.5 w-3.5" /> Select File
                </>
              )}
            </AdminButton>
          </div>
        )}

        {/* Error message */}
        {uploadError && (
          <p className="text-xs font-mono text-red-400 bg-red-950/40 border border-red-900/50 rounded px-2.5 py-1.5">
            {uploadError}
          </p>
        )}

        {/* Optional Manual URL input */}
        {showManualInput && (
          <div className="pt-2 border-t border-zinc-800/80">
            <label className="text-[0.68rem] font-mono text-zinc-500 block mb-1">
              Direct Image URL:
            </label>
            <AdminInput
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface MultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
}

export function AdminMultiImageUpload({
  images,
  onChange,
  label = 'Product Images'
}: MultiImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploadError(null);
    setIsUploading(true);
    setUploadCount(files.length);

    const uploadedUrls: string[] = [];
    const errors: string[] = [];

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const json = await res.json();
        if (json?.success && json?.data?.secure_url) {
          uploadedUrls.push(json.data.secure_url);
        } else {
          errors.push(file.name);
        }
      } catch (err) {
        errors.push(file.name);
      }
    }

    if (uploadedUrls.length > 0) {
      onChange([...images, ...uploadedUrls]);
    }

    if (errors.length > 0) {
      setUploadError(`Failed to upload ${errors.length} file(s): ${errors.join(', ')}`);
    }

    setIsUploading(false);
    setUploadCount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectFilesClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const item = images[index];
    const filtered = images.filter((_, i) => i !== index);
    onChange([item, ...filtered]);
  };

  const handleAddManualUrl = () => {
    if (!newImageUrl.trim()) return;
    onChange([...images, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  return (
    <div className="space-y-3 pt-4 border-t border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-white flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-zinc-400" />
          {label} ({images.length})
        </h3>

        <div className="flex items-center gap-2">
          <AdminButton
            type="button"
            size="sm"
            onClick={handleSelectFilesClick}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading ({uploadCount})...
              </>
            ) : (
              <>
                <UploadCloud className="h-3.5 w-3.5 text-amber-400" /> Select File(s)
              </>
            )}
          </AdminButton>
          <button
            type="button"
            onClick={() => setShowManualInput(!showManualInput)}
            className="text-[0.68rem] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {showManualInput ? 'Hide URL' : '+ URL'}
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFilesChange}
        className="hidden"
      />

      {uploadError && (
        <p className="text-xs font-mono text-red-400 bg-red-950/40 border border-red-900/50 rounded px-3 py-1.5">
          {uploadError}
        </p>
      )}

      {/* Thumbnails Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((img: string, idx: number) => {
          const isCover = idx === 0;
          const isCloudinary = img.includes('cloudinary.com');

          return (
            <div
              key={idx}
              className={`relative group rounded-lg border overflow-hidden aspect-[4/3] bg-zinc-900 transition-all ${
                isCover ? 'border-amber-400/80 ring-1 ring-amber-400/40' : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/acryglo_cast_acrylic_sheets.webp';
                }}
              />

              {/* Cover Badge */}
              {isCover && (
                <span className="absolute top-1.5 left-1.5 bg-amber-400 text-zinc-950 font-mono text-[0.6rem] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                  <Star className="h-2.5 w-2.5 fill-current" /> Cover
                </span>
              )}

              {/* Cloudinary Indicator */}
              {isCloudinary && !isCover && (
                <span className="absolute top-1.5 left-1.5 bg-black/80 text-emerald-400 border border-emerald-500/40 font-mono text-[0.55rem] px-1.5 py-0.5 rounded">
                  Cloudinary
                </span>
              )}

              {/* Hover overlay actions */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                {!isCover && (
                  <button
                    type="button"
                    onClick={() => handleSetCover(idx)}
                    className="w-full text-[0.68rem] font-mono py-1 px-2 rounded bg-zinc-800 hover:bg-zinc-700 text-amber-300 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Star className="h-3 w-3" /> Set as Cover
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="w-full text-[0.68rem] font-mono py-1 px-2 rounded bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center gap-1 transition-colors"
                >
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>
            </div>
          );
        })}

        {/* Upload Slot Card */}
        <button
          type="button"
          onClick={handleSelectFilesClick}
          disabled={isUploading}
          className="aspect-[4/3] rounded-lg border-2 border-dashed border-zinc-800 hover:border-zinc-600 bg-zinc-950/40 flex flex-col items-center justify-center p-3 text-center transition-colors group cursor-pointer"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-1.5">
              <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
              <span className="font-mono text-[0.65rem] text-zinc-400">Uploading to Cloudinary...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <div className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-800">
                <UploadCloud className="h-4 w-4 text-amber-400" />
              </div>
              <span className="font-mono text-[0.7rem] font-medium text-zinc-300">Select File</span>
              <span className="font-mono text-[0.6rem] text-zinc-500">Auto-upload to Cloudinary</span>
            </div>
          )}
        </button>
      </div>

      {/* Manual URL Input */}
      {showManualInput && (
        <div className="flex gap-2 pt-2 border-t border-zinc-800">
          <AdminInput
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Enter direct image URL (https://... or /image.webp)"
          />
          <AdminButton type="button" onClick={handleAddManualUrl} variant="outline">
            Add
          </AdminButton>
        </div>
      )}
    </div>
  );
}
