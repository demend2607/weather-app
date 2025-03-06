import { useFeedbackStore } from "./lib/feedbackItemsStore";

const HashtagList = () => {
  const hashtags = useFeedbackStore((state) => state.hashtags);
  // let textHandle = useFeedbackStore((state) => state.textHandle);

  const handleHashtag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    return;
  };
  return (
    <div className="hashtags">
      {hashtags.map((hashtag) => (
        <li key={hashtag.id}>
          <button onClick={handleHashtag}>{hashtag.text}</button>
        </li>
      ))}
    </div>
  );
};
export default HashtagList;
