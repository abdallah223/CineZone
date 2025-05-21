import logo from "../assets/images/logo.webp";

export default function Logo() {
  return (
    <div>
      <a href="./index.html" className="logo">
        <img src={logo} alt="CineZone" />
      </a>
    </div>
  );
}
