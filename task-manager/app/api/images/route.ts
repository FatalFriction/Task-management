import { storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export default async function uploader(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const form = formidable();
    const fields: any = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve(fields);
      });
    });

    const storages = storage;
    const file = fields.file; // Assuming the input field is named 'file'
    console.log(file + "this")

    const fileRef = ref(storages, `${file.name}`);

    const metadata = {
      contentType: file.type,
    };

    const uploadTask = uploadBytesResumable(fileRef, file, metadata);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    });

    const url = await getDownloadURL(uploadTask.snapshot.ref);

    res.status(200).json({
      message: "upload success",
      url,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      error: 'Upload failed',
    });
  }
}
