import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

export const deleteImage = async (title: string): Promise<string> => {
  try {
    // Create a reference to the file to delete
    const storageRef = ref(storage, `/${title}`);

    // Delete the file
    await deleteObject(storageRef);

    return `/${title} successfully deleted`;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};
