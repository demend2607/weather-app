import { useState } from "react";
import "./writter.scss";

const Writter = () => {
  const [writer, setWriter] = useState({ name: "", email: "" });
  const [submittedWriter, setSubmittedWriter] = useState<{ name: string; email: string } | null>(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setWriter((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("writer state:", submittedWriter);
    setSubmittedWriter({ ...writer });
  };
  const resetValues = () => {
    setWriter({ name: "", email: "" });
    setSubmittedWriter(null);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-container">
          <input type="text" placeholder="" name="name" required value={writer.name} onChange={handleInput} />
          <label>Full Name</label>
        </div>
        <div className="input-container">
          <input type="mail" placeholder="" name="email" required value={writer.email} onChange={handleInput} />
          <label>Email</label>
        </div>
        <div className="btn-container">
          <input type="submit" className="btn" value="Submit" />
          <input type="reset" className="btn reset-btn" value="Reset" onClick={resetValues} />
        </div>
      </form>
      {submittedWriter && (
        <div>
          <h2>Submitted Writer:</h2>
          <p>Name: {submittedWriter.name}</p>
          <p>Email: {submittedWriter.email}</p>
        </div>
      )}
    </>
  );
};
export default Writter;
