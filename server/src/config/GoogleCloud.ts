import { Storage } from "@google-cloud/storage";
const storage = new Storage({
  projectId: "campuswap",
  keyFilename: "campuswap-05910bbb9d29.json",
});

export const uploadToFirebaseStorage = async (
  filepath: string,
  fileName: string,
) => {
  try {
    const gcs = storage.bucket("campuswapstorage");
    const storagepath = `${fileName}`;
    const result = await gcs.upload(filepath, {
      destination: storagepath,
      predefinedAcl: "publicRead",
      metadata: {
        contentType: "image/jpeg",
      },
    });
    return result[0].metadata.mediaLink;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
