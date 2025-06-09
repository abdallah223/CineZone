export default function LightButton({ onClick, icon, label, className }) {
  return (
    <button onClick={onClick}>
      <div className={`iconed-text light-btn ${className}`}>
        <span className="icon">{icon}</span>
        <span>{label}</span>
      </div>
    </button>
  );
}
