import css from "./ImageCard.module.css";

const ImageCard = ({ image }) => {
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
