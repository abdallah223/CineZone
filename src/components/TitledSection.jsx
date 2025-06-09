import { Link } from "react-router-dom";

export default function TitledSection({ title, children, link = "" }) {
  return (
    <div className="section">
      <div className="section-heading">
        <div className="title">
          <h3>{title}</h3>
        </div>
        {link && (
          <div className="more">
            <Link to={`/${link}`}>See More</Link>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
