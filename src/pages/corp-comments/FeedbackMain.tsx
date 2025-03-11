import { useEffect } from "react";

import { useFeedbackStore } from "./lib/feedbackItemsStore";

import ErrorMessage from "../../shared/error/ErrorMessage";
import Spinner from "../../shared/spinner/Spinner";

import FeedbackHead from "./FeedbackHead";
import FeedbackItem from "./FeedbackItem";

const FeedbackMain = () => {
  const isLoad = useFeedbackStore((state) => state.loading);
  const isError = useFeedbackStore((state) => state.error);
  const filteredItemsList = useFeedbackStore((state) => state.filteredFeedbackItems());

  const fetchData = useFeedbackStore((state) => state.fetchData);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="corp-body">
      <FeedbackHead />
      <ol className="feedback-list">
        {isError && <ErrorMessage error={isError} />}
        {isLoad && filteredItemsList.length === 0 ? <Spinner /> : null}

        {filteredItemsList.map((item) => (
          <FeedbackItem key={item.id} feedbackItem={item} />
        ))}
      </ol>
    </div>
  );
};
export default FeedbackMain;
