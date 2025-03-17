import { BookmarksButton } from "./Bookmarks";
import Header, { HeaderTop } from "./Header";
import JobItemContent from "./JobItemContent";

import "./rmtDev.scss";
import SearchForm from "./SearchForm";
import Sidebar from "./Sidebar";

const RmtDevMain = () => {
  return (
    <div className="rmt-body">
      <Header>
        <HeaderTop>
          <a href="/rmt-dev" className="logo">
            <img src="https://bytegrad.com/course-assets/js/2/logo.svg" alt="Logo" className="logo__img" />
          </a>
          <BookmarksButton />
        </HeaderTop>
        <SearchForm />
      </Header>
      <div className="container">
        <Sidebar />
        <JobItemContent />
      </div>
    </div>
  );
};
export default RmtDevMain;
