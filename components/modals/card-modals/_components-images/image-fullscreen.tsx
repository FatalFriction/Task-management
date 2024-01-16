import Image from "next/image";

interface ExpandedImageModalProps {
    imageUrl: string;
    onClose: () => void;
  }
  
export const ExpandedImageModal: React.FC<ExpandedImageModalProps> = ({ imageUrl, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-75" onClick={onClose}></div>
        <div className="z-10 max-w-screen-[2400px] max-h-full overflow-auto">
          <Image src={imageUrl} alt="Expanded Image" width={1080} height={768} objectFit="contain"  objectPosition="50% 50%"/>
        </div>
      </div>
    );
  };