import { useEffect } from "react";

import { useRmtDevStore } from "./lib/rmtDevStore";
import Spinner from "../../shared/spinner/Spinner";
import BookmarkIcon from "./Bookmarks";

export default function JobItemContent() {
  const jobDetails = useRmtDevStore((state) => state.jobDetailList);
  const isLoading = useRmtDevStore((state) => state.loading.jobDetails);

  const getActiveJobId = useRmtDevStore((state) => state.getActiveJobId);
  const fetchJobDetails = useRmtDevStore((state) => state.fetchJobDetails);
  const jobId = useRmtDevStore((state) => state.jobId);

  useEffect(() => {
    getActiveJobId();

    window.addEventListener("hashchange", getActiveJobId);
    if (jobId) {
      fetchJobDetails();
    }
    return () => {
      window.removeEventListener("hashchange", getActiveJobId);
    };
  }, [jobId]);

  return isLoading ? (
    <Spinner color="l-gray" />
  ) : jobDetails.length === 0 ? (
    <EmptyJobContent />
  ) : (
    <section className="job-details">
      <div>
        <img src={jobDetails.coverImgURL} alt="#" />

        <a className="apply-btn" href={jobDetails.companyURL} target="_blank">
          Apply
        </a>

        <section className="job-info">
          <div className="job-info__left">
            <div className="job-info__badge">{jobDetails.badgeLetters}</div>
            <div className="job-info__below-badge">
              <time className="job-info__time">{jobDetails.daysAgo}d</time>

              <BookmarkIcon />
            </div>
          </div>

          <div className="job-info__right">
            <h2 className="second-heading">{jobDetails.title}</h2>
            <p className="job-info__company">{jobDetails.company}</p>
            <p className="job-info__description">{jobDetails.description}</p>
            <div className="job-info__extras">
              <p className="job-info__extra">
                <i className="fa-solid fa-clock job-info__extra-icon"></i>
                {jobDetails.duration}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                {jobDetails.salary}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-location-dot job-info__extra-icon"></i> {jobDetails.location}
              </p>
            </div>
          </div>
        </section>

        <div className="job-details__other">
          <section className="qualifications">
            <div className="qualifications__left">
              <h4 className="fourth-heading">Qualifications</h4>
              <p className="qualifications__sub-text">Other qualifications may apply</p>
            </div>
            <ul className="qualifications__list">
              {jobDetails.qualifications.map((item: string) => (
                <li key={item} className="qualifications__item">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="reviews">
            <div className="reviews__left">
              <h4 className="fourth-heading">Company reviews</h4>
              <p className="reviews__sub-text">Recent things people are saying</p>
            </div>
            <ul className="reviews__list">
              {jobDetails.reviews.map((item: string) => (
                <li key={item} className="reviews__item">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="job-details__footer">
          <p className="job-details__footer-text">
            If possible, please reference that you found the job on <span className="u-bold">rmtDev</span>, we would really appreciate it!
          </p>
        </div>
      </div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    <section className="job-details">
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>Start by searching for any technology your ideal job is working with</p>
        </div>
      </div>
    </section>
  );
}
