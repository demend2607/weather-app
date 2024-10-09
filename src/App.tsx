import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./components/pages/home/Home";
import Counter from "./components/pages/counter/Counter";
import Weather from "./components/pages/weather/Weather";
import Writter from "./components/pages/writter/Writter";

import "./app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/writter" element={<Writter />} />
      </Route>
    </Routes>
  );
}

export default App;
