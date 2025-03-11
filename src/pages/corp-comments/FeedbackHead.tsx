import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/free-solid-svg-icons";

import FeedbackForm from "./FeedbackForm";

export default function FeedbackHead() {
  return (
    <div className="header">
      <img src="https://bytegrad.com/course-assets/js/1/pattern.svg" alt="pattern" className="pattern" />
      <div className="logo">
        <a href="/corp-comment">
          <FontAwesomeIcon className="awesome" icon={faMountainSun} />
          <strong>Corp</strong>Comment
        </a>
      </div>
      <h1>
        <strong>Give Feedback.</strong> Welcome.
      </h1>
      <FeedbackForm />
    </div>
  );
}
