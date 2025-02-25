import CorpMain from "./FeedbackMain";
import HashtagList from "./HashtagList";

import "./corpComment.scss";

const CorpComments = () => {
  return (
    <div className="corp-comment">
      <CorpMain />
      <HashtagList />
    </div>
  );
};
export default CorpComments;
