import { ChangeEvent, useState } from "react";
import "./wordAnalytics.scss";
import Stat from "./Stat";

const WordAnalytics = () => {
  const [lengthText, setLengthText] = useState("");
  const [warningText, setWarningText] = useState("");

  // Maybe will make an external component in the future <Stats />
  const stats = {
    numberOfWords: lengthText.split(/\s+/).filter((word) => word !== "").length,
    numberOfCharacters: lengthText.length,
    numberOfInstagramm: 280 - lengthText.length,
    numberOfTwitter: 2200 - lengthText.length,
  }

  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let newText = e.target.value;
    if (newText.includes("<script>")) {
      setWarningText("No script tag allowed!");
      newText = newText.replace("<script>", "");
    } else if (newText.includes("@")) {
      setWarningText("No @ symbol allowed!");
      newText = newText.replace("@", "");
    } else {
      setWarningText("");
    }

    setLengthText(newText);
  };
  return (
    <div className="word-analytics">
      <div className="textarea">
        <textarea value={lengthText} onChange={handleText} placeholder="Enter your text here..." spellCheck="false"></textarea>
        <p className="warning">{warningText}</p>
      </div>
      <section className="stats">
        <Stat label="Words" number={stats.numberOfWords} />
        <Stat label="Characters" number={stats.numberOfCharacters} />
        <Stat label="Instagramm" number={stats.numberOfInstagramm} />
        <Stat label="Twitter" number={stats.numberOfTwitter} />
      </section>
    </div>
  );
};

export default WordAnalytics;
