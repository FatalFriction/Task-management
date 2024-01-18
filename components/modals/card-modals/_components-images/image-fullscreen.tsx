import Image from "next/image";
import { useState } from "react";

interface ExpandedImageModalProps {
    imageUrl: string;
    onClose: () => void;
  }
  
export const ExpandedImageModal: React.FC<ExpandedImageModalProps> = ({ imageUrl, onClose }) => {

    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      setImageWidth(img.naturalWidth);
      setImageHeight(img.naturalHeight);
    };

    return (
      <div className="fixed inset-0 z-50 flex flex-wrap items-center justify-center p-4">
        <div className="absolute inset-0 bg-black opacity-75" onClick={onClose}/>
        <div className="z-10 overflow-auto">
          <Image
            src={imageUrl}
            alt="Expanded Image"
            sizes="(max-width: 768px,max-height: 768px) 40vw"
            onLoad={handleImageLoad}
            layout="responsive"
            objectFit="contain"
            objectPosition="50% 50%"
            width={imageWidth}
            height={imageHeight}
          />
        </div>
      </div>
    );
  };