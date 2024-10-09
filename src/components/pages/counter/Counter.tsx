import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

import "./counter.scss";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  const couterHandler = (action: string) => {
    switch (action) {
      case "increment":
        setCounter(counter + 1);
        break;
      case "decrement":
        if (counter <= 0) {
          setCounter(0);
          break;
        }
        setCounter(counter - 1);
        break;
      case "reset":
        setCounter(0);
        break;
      default:
        console.log("error");
    }
  };
  return (
    <div className="container">
      <div className="counter-section">
        <div className="application">
          <div className={`counter ${counter == 0 ? "zero" : counter <= 5 ? "low" : "high"}`}>
            <h2>Counter</h2>
            <p>{counter}</p>
          </div>

          <div className="counter-btns">
            <button className="counter-ref" onClick={() => couterHandler("reset")}>
              <FontAwesomeIcon icon={faArrowsRotate} />
            </button>
            <button className="counter-calc" onClick={() => couterHandler("decrement")}>
              -
            </button>
            <button className="counter-calc" onClick={() => couterHandler("increment")}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
