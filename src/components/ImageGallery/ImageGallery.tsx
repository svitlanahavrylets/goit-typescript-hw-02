import { FC } from "react";
import { Image } from "../App/App.types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImagesListProps {
  images: Image[];
  openModal: (image: Image) => void;
}

const ImageGallery: FC<ImagesListProps> = ({ images, openModal }) => {
  return (
    <ul className={css.list}>
      {images.map((image: Image) => (
        <li key={image.id} onClick={() => openModal(image)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
