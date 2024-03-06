import { v2 as cloudinary } from "cloudinary";
import { unlink, writeFile } from "fs/promises";
import { join } from "path";
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export  function saveImage(image: File) {
  // const reader = new FileReader();
  // reader.onloadend = function() {
  //   console.log('RESULT', reader.result)
  // }
  // reader.readAsDataURL(image);
  // const bytes = await image.arrayBuffer();
  // const buffer = Buffer.from(bytes);
  // const path = join("C:\\Users\\aashi\\", "Documents", image.name);
  // await writeFile(path, buffer);
  // const { secure_url } = await cloudinary.uploader.upload(path, {
  //   public_id: crypto.randomUUID(),
  // });
  // await unlink(path);
  return ;
}

//to convert image into base64 string
export async function encodeImageFileAsURL(file: any) {
  return new Promise<any>((resolve,reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      resolve(base64)
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  })
}
