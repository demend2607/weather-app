import { useFeedbackStore } from "./lib/feedbackItemsStore";

const HashtagList = () => {
  const items = useFeedbackStore((state) => state.items);
  const filteredFeedbackItems = useFeedbackStore((state) => state.filteredFeedbackItems);

  const companyList = items.map((item) => item.companyName);

  const sortByHashtag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // filteredFeedbackItems(e.currentTarget.innerText.slice(1));
    console.log(e.currentTarget.innerText);
    return;
  };
  return (
    <div className="hashtags">
      {companyList.map((company) => (
        <li key={company}>
          <button onClick={sortByHashtag}>#{company}</button>
        </li>
      ))}
    </div>
  );
};
export default HashtagList;
