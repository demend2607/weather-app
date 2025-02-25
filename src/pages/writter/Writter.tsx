import { useState } from "react";
import "./writter.scss";

const Writter = () => {
  const [writer, setWriter] = useState({ name: "", email: "" });
  const [submittedWriter, setSubmittedWriter] = useState<{ name: string; email: string } | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setWriter((prevState) => ({ ...prevState, [name]: value }));
    if (name === "email") {
      validateEmail(value);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError(null);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(writer.email);
    if (!emailError) {
      console.log("writer state:", submittedWriter);
      setSubmittedWriter({ ...writer });
    }
  };
  const resetValues = () => {
    setWriter({ name: "", email: "" });
    setSubmittedWriter(null);
    setEmailError(null);
  };
  return (
    <div className="application">
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
        {emailError && <p className="error">{emailError}</p>}
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
    </div>
  );
};
export default Writter;
