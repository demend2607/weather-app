import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

import { useJobItemsDetail } from "./lib/hooks";
import { useRmtDevStore } from "./lib/rmtDevStore";

import Spinner from "../../shared/spinner/Spinner";
import { BookmarkIcon } from "./Bookmarks";
import toast from "react-hot-toast";

export default function JobItemContent() {
  const { getActiveJobId, jobId } = useRmtDevStore((state) => state);
  const { jobItem, isLoading, error } = useJobItemsDetail();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    getActiveJobId();

    window.addEventListener("hashchange", getActiveJobId);
    return () => {
      window.removeEventListener("hashchange", getActiveJobId);
    };
  }, [jobId, getActiveJobId]);

  return isLoading ? (
    <Spinner color="l-gray" />
  ) : jobItem === undefined ? (
    <EmptyJobContent />
  ) : (
    <section className="job-details">
      <div>
        <img src={jobItem.coverImgURL} alt="#" />

        <a className="apply-btn" href={jobItem.companyURL} target="_blank">
          Apply
        </a>

        <section className="job-info">
          <div className="job-info__left">
            <div className="job-info__badge">{jobItem.badgeLetters}</div>
            <div className="job-info__below-badge">
              <time className="job-info__time">{jobItem.daysAgo}d</time>

              <BookmarkIcon id={jobItem.id} />
            </div>
          </div>

          <div className="job-info__right">
            <h2 className="second-heading">{jobItem.title}</h2>
            <p className="job-info__company">{jobItem.company}</p>
            <p className="job-info__description">{jobItem.description}</p>
            <div className="job-info__extras">
              <p className="job-info__extra">
                <FontAwesomeIcon icon={faClock} />
                {jobItem.duration}
              </p>
              <p className="job-info__extra">
                <FontAwesomeIcon icon={faMoneyBill} />
                {jobItem.salary}
              </p>
              <p className="job-info__extra">
                <FontAwesomeIcon icon={faLocationDot} />
                {jobItem.location}
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
              {jobItem.qualifications.map((item: string) => (
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
              {jobItem.reviews.map((item: string) => (
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
