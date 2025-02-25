export default function TrekBtn({ type, children, onсlick }: { type: string; children: string; onсlick: () => void }) {
  const BUTTON_TYPE: { [key: string]: string } = {
    secondary: "btn--secondary",
  };
  return (
    <button onClick={onсlick} type="submit" className={`btn ${BUTTON_TYPE[type]}`}>
      {children}
    </button>
  );
}
