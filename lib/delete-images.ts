import { storage } from "@/firebase/firebase";
import { ref, deleteObject, listAll } from "firebase/storage";

const storages = storage;

export const deleteImage = async (id: string, title: string): Promise<string> => {
  try {
    // Create a reference to the file to delete
    const storageRef = ref(storages, `${id}/${title}`);

    // Delete the file
    await deleteObject(storageRef);

    return `/${title} successfully deleted`;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export const deleteImageBucket = async (id: string): Promise<string> => {
  try {
    const storageRef = ref(storage, id+"/");
    const items = await listAll(storageRef);

    // Delete each item in the folder
    await Promise.all(
      items.items.map(async (itemRef) => {
        console.log(itemRef)
        await deleteObject(itemRef);
      })
    );

    return `Image bucket successfully deleted`;
  } catch (error) {
    console.error('Error deleting image bucket:', error);
    throw error;
  }
};
