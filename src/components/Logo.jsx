import logo from "../assets/images/logo.webp";
import { Link } from "react-router-dom";

export default function Logo({ clickable = true }) {
  if (clickable) {
    return (
      <Link to="/" className="logo">
        <img src={logo} alt="CineZone" />
      </Link>
    );
  }
  return (
    <div>
      <img src={logo} alt="CineZone" />
    </div>
  );
}
