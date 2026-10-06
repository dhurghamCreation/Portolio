/**
 * Robust Client-Side Download Engine
 * Handles downloading of PDFs, Microsoft Office documents (.pptx, .docx, .xlsx),
 * images, and binaries without browser iframe sandbox "Failed - Download error" blocks.
 */

import { toast } from "sonner";

export interface DownloadOptions {
  fallbackUrl?: string;
  mimeType?: string;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}

export async function downloadAsset(
  url: string,
  filename: string,
  options?: DownloadOptions
): Promise<boolean> {
  options?.onStart?.();
  const toastId = toast.loading(`Preparing download for ${filename}...`);

  try {
    // 1. Properly encode the URL so spaces and special characters are handled cleanly
    const safeUrl = encodeURI(url);

    // 2. Fetch the resource into memory as a blob
    const response = await fetch(safeUrl);
    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}: ${response.statusText}`);
    }

    const blob = await response.blob();

    // 3. Ensure appropriate MIME type if missing
    let typedBlob = blob;
    if (options?.mimeType && blob.type !== options.mimeType) {
      typedBlob = new Blob([blob], { type: options.mimeType });
    }

    // 4. Create an in-memory Object URL
    // In-memory blob: URLs are origin-isolated and bypass iframe sandbox download blocking
    const objectUrl = window.URL.createObjectURL(typedBlob);

    // 5. Create synthetic anchor element and trigger download
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();

    // 6. Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    }, 15000);

    toast.success(`Downloaded ${filename} successfully!`, { id: toastId });
    options?.onSuccess?.();
    return true;
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error(`Client blob download failed for ${url}:`, error);

    // Fallback: direct synthetic navigation or opening in new window
    try {
      const fallbackLink = document.createElement("a");
      fallbackLink.href = encodeURI(url);
      fallbackLink.download = filename;
      fallbackLink.target = "_blank";
      fallbackLink.rel = "noopener noreferrer";
      fallbackLink.style.display = "none";
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      setTimeout(() => document.body.removeChild(fallbackLink), 5000);

      toast.success(`Started download for ${filename}`, { id: toastId });
      options?.onSuccess?.();
      return true;
    } catch (fallbackErr) {
      console.error("Download fallback failed:", fallbackErr);
      toast.error(`Could not download ${filename}. Please try again.`, { id: toastId });
      options?.onError?.(error);
      return false;
    }
  }
}
