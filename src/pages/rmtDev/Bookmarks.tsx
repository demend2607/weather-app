import { useRef, useState, forwardRef } from "react";
import { BookmarkFilledIcon, TriangleDownIcon } from "@radix-ui/react-icons";

import { useRmtDevStore } from "./lib/rmtDevStore";
import { useJobItemsBookmark, useOnClickOutside } from "./lib/hooks";

import JobItem from "./JobItem";
import Spinner from "../../shared/spinner/Spinner";

export function BookmarkIcon({ id }: { id: number }) {
  const { toggleBookMark, bookMarkedIds } = useRmtDevStore((state) => state);

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        toggleBookMark(id);
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <BookmarkFilledIcon className={bookMarkedIds.includes(id) ? "filled" : ""} />
    </button>
  );
}

export function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([buttonRef, popoverRef], () => {
    setIsOpen(false);
  });

  return (
    <section>
      <button ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)} className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { jobItem, isLoading } = useJobItemsBookmark();
  const jobId = useRmtDevStore((state) => state.jobId);

  return (
    <div className="bookmarks-popover" ref={ref}>
      <ul className="job-list">
        {isLoading ? <Spinner color="l-gray" /> : jobItem.map((job) => <JobItem key={job?.id} jobItem={job} isActive={job?.id === jobId} />)}
      </ul>
    </div>
  );
});

export default BookmarksButton;
