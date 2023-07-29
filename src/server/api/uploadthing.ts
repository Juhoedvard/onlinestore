/* eslint-disable @typescript-eslint/require-await */




import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {

  strictImageAttachment: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })

    .onUploadComplete(async ({  file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:");

      console.log("file url", file.url);
    }),


} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;