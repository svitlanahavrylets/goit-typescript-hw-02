import css from "./ImageCard.module.css";
import { Image } from "../App/App.types";
import { FC } from "react";

interface ImageItemProps {
  image:Image
}

const ImageCard: FC<ImageItemProps> = ({ image }) => {
  return (
    <div className={css.divCard}>
      <img
        className={css.imageCard}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
