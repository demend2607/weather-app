import BookmarkIcon from "./Bookmarks";

import { JobItemT } from "./lib/rmtDevStore";
export default function JobItem({ jobItem }: { jobItem: JobItemT }) {
  return (
    <li className="job-item">
      <a className="job-item__link" href={`/rmt-dev/#${jobItem.id}`}>
        <div className="job-item__badge">{jobItem.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{jobItem.title}</h3>
          <p className="job-item__company">{jobItem.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
