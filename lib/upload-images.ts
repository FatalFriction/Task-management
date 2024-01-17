import { storage } from "@/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL, UploadTaskSnapshot } from "firebase/storage";

const storages = storage;

export const uploadImage = (
  file: File,
  rename: string,
  progressCallback: (progress: number) => void,
  id?: string,
): Promise<string> => {
    const metadata = {
    contentType: file.type
    };

  return new Promise((resolve, reject) => {
    
    const storageRef = rename
      ? ref(storages, `${id}/${rename}`) 
      : ref(storages, `${id}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
      (snapshot: UploadTaskSnapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressCallback(progress)
        
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.error('Error unauthorized object access:', error);
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            console.error('Error Upload Cancelled:', error);
            // User canceled the upload
            break;
          case 'storage/object-not-found': 
          console.error('Error uploading file:', error);
            break;
          case 'storage/unknown':
            console.error('Uknown error occured:', error);
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          console.error('Error getting download URL:', error);
          reject(error);
        }
      }
    );
  });
};
