import "./errorMessage.scss";
export default function ErrorMessage({ error }: { error: string }) {
  return <div className="error">Something went wrong: {error}</div>;
}
