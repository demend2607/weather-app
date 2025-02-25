import { useState } from "react";

import { MAX_CHAR } from "./lib/InitialState";
import { useFeedbackStore } from "./lib/corpStore";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const charCount = MAX_CHAR - text.length;

  const items = useFeedbackStore((state) => state.items);
  const addItem = useFeedbackStore((state) => state.addItem);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem(text);
    setText("");
    console.log(items);
  };
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    console.log(text);
    return setText(e.target.value.slice(0, MAX_CHAR));
  };
  return (
    <form className="form" action="" onSubmit={handleSubmit}>
      <textarea name="" id="feedback-textarea" spellCheck={false} value={text} onChange={handleInput}></textarea>
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
