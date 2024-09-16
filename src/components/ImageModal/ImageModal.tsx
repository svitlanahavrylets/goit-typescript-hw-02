import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { Image } from "../App/App.types";
import { FC } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

interface ImagesModalProps {
  closeModal: () => void;
  modalIsOpen: boolean;
  modalImage: Image | null;
}
const ImageModal: FC<ImagesModalProps> = ({
  closeModal,
  modalIsOpen,
  modalImage,
}) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {modalImage && (
          <img className={css.modal} src={modalImage.urls.regular} />
        )}
      </Modal>
    </div>
  );
};

export default ImageModal;
