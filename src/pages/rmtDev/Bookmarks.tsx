import { BookmarkFilledIcon, TriangleDownIcon } from "@radix-ui/react-icons";
export default function BookmarkIcon() {
  return (
    <button className="bookmark-btn">
      <BookmarkFilledIcon className="filled" />
    </button>
  );
}

export function BookmarksButton() {
  return (
    <section>
      <button className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>
    </section>
  );
}

export function BookmarksPopover() {
  return <div className="bookmarks-popover"></div>;
}
