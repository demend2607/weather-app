import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

import { useFeedbackStore } from "./lib/feedbackItemsStore";
import { FeedbackItemType } from "./lib/InitialState";

export default function FeedbackItem({ feedbackItem }: { feedbackItem: FeedbackItemType }) {
  const [open, setOpen] = useState(false);

  const upvoteIncreased = useFeedbackStore((state) => state.upvoteIncreased);
  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    upvoteIncreased(feedbackItem.id);
    e.currentTarget.disabled = true;
    e.stopPropagation();
  };

  return (
    <li onClick={() => setOpen(!open)} className={`feedback ${open ? "feedback--expand" : ""}`}>
      <button onClick={handleUpvote}>
        <FontAwesomeIcon icon={faAngleUp} />
        <span>{feedbackItem.upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.companyName}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
