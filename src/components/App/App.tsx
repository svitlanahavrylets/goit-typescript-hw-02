import { FC, useEffect, useState } from "react";
import "./App.css";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import getImages from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "./App.types";

const App: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<boolean>(false);

  useEffect(() => {
    if (query === "") {
      return;
    }
    const searchImages = async () => {
      try {
        setLoading(true);
        const data = await getImages(query, page);

        if (data.total_pages === 0) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again!"
          );
        }
        if (page === data.total_pages) {
          setCurrentPage(true);
        }

        if (page === 1) {
          setImages(data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...data.results]);
        }
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    searchImages();
  }, [query, page]);

  const getQuery = (inputValue: string) => {
    setQuery(inputValue);
    setPage(1);
  };

  const incrementPage = () => {
    // setPage((prevPage) => {
    //   return prevPage + 1;
    // });
    setPage(page + 1);
  };

  function openModal(image: Image): void {
    setIsOpen(true);
    setModalImage(image);
  }

  function closeModal(): void {
    setIsOpen(false);
    setModalImage(null);
  }

  return (
    <>
      <SearchBar onSubmit={getQuery} />
      {error && <ErrorMessage />}
      <ImageModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        modalImage={modalImage}
      />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {loading && <Loader />}
      {images.length > 0 && (
        <LoadMoreBtn incrementPage={incrementPage} currentPage={currentPage} />
      )}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
