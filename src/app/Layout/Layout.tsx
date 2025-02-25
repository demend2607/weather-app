import Footer from "./Footer";
import Container from "./Container";
import Header from "./Header";

import "./general.scss";
const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Container />
      <Footer />
    </div>
  );
};
export default Layout;
