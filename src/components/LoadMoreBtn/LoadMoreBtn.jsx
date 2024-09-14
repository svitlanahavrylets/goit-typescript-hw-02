import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ incrementPage, currentPage }) => {
  return (
    !currentPage && (
      <div>
        <button
          className={css.loadMoreBtn}
          type="button"
          onClick={incrementPage}
        >
          Load more
        </button>
      </div>
    )
  );
};

export default LoadMoreBtn;
