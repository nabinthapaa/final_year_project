import { v2 as cloudinary } from "cloudinary";
import { unlink, writeFile } from "fs/promises";
import { join } from "path";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveImage(image: File): Promise<string> {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join("/", "tmp", image.name);
  await writeFile(path, buffer);
  const { secure_url } = await cloudinary.uploader.upload(path, {
    public_id: crypto.randomUUID(),
  });
  await unlink(path);
  return secure_url;
}
