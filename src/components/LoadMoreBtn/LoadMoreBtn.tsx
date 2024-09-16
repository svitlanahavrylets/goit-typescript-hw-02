import { FC } from "react";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreProps {
  incrementPage: () => void;
  currentPage: boolean;
}

const LoadMoreBtn: FC<LoadMoreProps> = ({
  incrementPage,
  currentPage,
}) => {
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
