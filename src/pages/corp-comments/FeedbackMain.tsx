import { useEffect } from "react";
import axios from "axios";

import { useFeedbackStore } from "./lib/corpStore";

import FeedbackHead from "./FeedbackHead";
import FeedbackItem from "./FeedbackItem";

const FeedbackMain = () => {
  const items = useFeedbackStore((state) => state.items);

  // useEffect(() => {
  //   axios.get("https://bytegrad.com/course-assets/projects/corpcomments/api/feedbacks").then((res) => useFeedbackStore.setState({ items: res.data }));
  // }, []);

  return (
    <div className="corp-body">
      <FeedbackHead />
      <ol className="feedback-list">
        {items.map((item) => (
          <FeedbackItem key={item.id} feedbackItem={item} />
        ))}
      </ol>
    </div>
  );
};
export default FeedbackMain;
