import { useEffect, useState } from "react";
import "./App.css";

import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import getImages from "./services/api";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(false);

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
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    searchImages();
  }, [query, page]);

  const getQuery = (inputValue) => {
    setQuery(inputValue);
    setPage(1);
  };

  const incrementPage = () => {
    // setPage((prevPage) => {
    //   return prevPage + 1;
    // });
    setPage(page + 1);
  };

  function openModal(image) {
    setIsOpen(true);
    setModalImage(image);
  }

  function closeModal() {
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
