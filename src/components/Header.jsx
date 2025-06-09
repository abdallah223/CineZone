import NavBar from "./NavBar/Navbar";

export default function Header({ children, bgImg = "/images/header-bg.png" }) {
  return (
    <header
      className="header"
      style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.85) 20%, rgba(0, 0, 0, 0.80) 40%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0.4) 100%),url(${bgImg}) top center / cover no-repeat`,
      }}
    >
      <div className="top-header container">
        <NavBar />
      </div>
      <div>{children}</div>
    </header>
  );
}
