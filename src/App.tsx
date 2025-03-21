import { Routes, Route } from "react-router-dom";

import Layout from "./app/Layout/Layout";
import Home from "./pages/home/Home";
import Counter from "./pages/counter/Counter";
import Weather from "./pages/weather/Weather";
import Writter from "./pages/writter/Writter";
import WordAnalytics from "./pages/word-analytics/WordAnalytics";
import Trekbag from "./pages/trekbag/Trekbag";
import CorpComments from "./pages/corp-comments/CorpComments";
import RmtDevMain from "./pages/rmtDev/RmtDevMain";

import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/writter" element={<Writter />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/word-analytics" element={<WordAnalytics />} />
        <Route path="/trekbag" element={<Trekbag />} />
        <Route path="/corp-comment" element={<CorpComments />} />
        <Route path="/rmt-dev/" element={<RmtDevMain />} />
      </Route>
    </Routes>
  );
}

export default App;
