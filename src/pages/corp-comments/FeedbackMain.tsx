import { useEffect, useState } from "react";
import axios from "axios";

import { useFeedbackStore } from "./lib/feedbackItemsStore";

import ErrorMessage from "../../shared/error/ErrorMessage";
import Spinner from "../../shared/spinner/Spinner";

import FeedbackHead from "./FeedbackHead";
import FeedbackItem from "./FeedbackItem";

const FeedbackMain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const items = useFeedbackStore((state) => state.items);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchFeedbackData = async () => {
      setIsLoading(true);
      try {
        const response = await axios(
          /* Config settings  for optimize we can put it into const (import: AxiosRequestConfig)*/ {
            method: "get",
            url: "https://raw.githubusercontent.com/demend2607/weather-app/refs/heads/main/src/app/file/feedback.json",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            signal: signal,
          }
        );
        const data = await response.data;

        useFeedbackStore.setState({ items: data });
        setError("");
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(error.response?.data?.message || error.message || "Unknown error");
        }
      } finally {
        setIsLoading(false); // Always runs after try/catch
      }
    };

    fetchFeedbackData();

    // Cleanup function
    return () => controller.abort();
  }, []); // Empty dependency array = runs once on mount

  /*   useEffect(() => {
    const fetchFeedbackData = async () => {

      setIsLoading(true);
      try {
        const response = await axios.get("https://raw.githubusercontent.com/demend2607/weather-app/refs/heads/main/src/app/file/feedback.json",items);
        if (response.status !== 200) {
          throw new Error();
        }
        const data = await response.data;

        setTimeout(() => {
          setIsLoading(false);
          setError("");
          useFeedbackStore.setState({ items: data });
        }, 600);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFeedbackData();
  }, []);
 */
  return (
    <div className="corp-body">
      <FeedbackHead />
      <ol className="feedback-list">
        {error && <ErrorMessage error={error} />}
        {isLoading && items.length === 0 ? <Spinner /> : null}

        {items.map((item) => (
          <FeedbackItem key={item.id} feedbackItem={item} />
        ))}
      </ol>
    </div>
  );
};
export default FeedbackMain;
