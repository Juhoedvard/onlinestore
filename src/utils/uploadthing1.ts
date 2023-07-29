import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "~/server/api/uploadthing";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();