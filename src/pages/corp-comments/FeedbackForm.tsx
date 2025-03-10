import { useState } from "react";

import { MAX_CHAR } from "./lib/InitialState";
import { useFeedbackStore } from "./lib/feedbackItemsStore";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const charCount = MAX_CHAR - text.length;

  const addItem = useFeedbackStore((state) => state.addItem);

  const handleAddToList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      alert("Please enter some text");
      return;
    }
    const companyName = text
      .split(" ")
      .find((word) => word.startsWith("#"))
      ?.substring(1);
    if (!companyName) {
      alert("Please include a #hashtag for the company name");
      return;
    }
    addItem(text);
    setText("");
  };
  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    return setText(e.target.value.slice(0, MAX_CHAR));
  };

  return (
    <form className={`form`} action="" onSubmit={handleAddToList}>
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
