import "./general.scss";
import { Outlet } from "react-router-dom";

const Container = () => {
  return (
    <main>
      <div className="container">
        <div className="section">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
export default Container;
