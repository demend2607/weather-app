import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

import { useFeedbackStore } from "./lib/corpStore";

export default function FeedbackItem({ feedbackItem }) {
  const upvoteIncreased = useFeedbackStore((state) => state.upvoteIncreased);

  return (
    <li className="feedback">
      <button onClick={() => upvoteIncreased(feedbackItem.id)}>
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
      <p>{feedbackItem.daysAgo}d</p>
    </li>
  );
}
