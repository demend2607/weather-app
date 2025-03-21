import "./spinner.scss";
type SpinnerProps = { color?: string };
const Spinner = ({ color }: SpinnerProps) => {
  return <div className={`spinner ${color ? color : ""}`}></div>;
};
export default Spinner;
