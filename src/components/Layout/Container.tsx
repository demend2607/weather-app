import "./general.scss";
import { Outlet } from "react-router-dom";

const Container = () => {
  return (
    <main>
      <div className="container">
        <div className="section">
          <div className="application">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Container;
