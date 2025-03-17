import { useState } from "react";

import { MAX_CHAR } from "./lib/InitialState";
import { useFeedbackStore } from "./lib/feedbackItemsStore";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [formInvalid, setFormInvalid] = useState(false);
  const charCount = MAX_CHAR - text.length;

  const addItem = useFeedbackStore((state) => state.addItem);

  const handleAddToList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.includes("#") && text.length > 5) {
      addItem(text);
      setFormValid(true);
      setTimeout(() => setFormValid(false), 3000);
      return setText("");
    } else {
      setFormInvalid(true);
      setTimeout(() => setFormInvalid(false), 3000);
      return;
    }
  };
  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    return setText(e.target.value.slice(0, MAX_CHAR));
  };

  return (
    <form className={`form ${formValid ? "form--valid" : formInvalid ? "form--invalid" : ""}`} action="" onSubmit={handleAddToList}>
      <textarea name="" id="feedback-textarea" spellCheck={false} placeholder="bla" value={text} onChange={handleTextInput}></textarea>
      <label htmlFor="feedback-textarea">Enter your feedback here, remember to #hashtag the company</label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
