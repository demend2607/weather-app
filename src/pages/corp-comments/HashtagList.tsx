import { useFeedbackStore } from "./lib/feedbackItemsStore";

const HashtagList = () => {
  const selectCompany = useFeedbackStore((state) => state.selectCompany);
  const companyList = useFeedbackStore((state) => state.getCompanyList());

  return (
    <div className="hashtags">
      {companyList.map((company) => (
        <li key={company}>
          <button onClick={() => selectCompany(company)}>#{company}</button>
        </li>
      ))}
    </div>
  );
};
export default HashtagList;
