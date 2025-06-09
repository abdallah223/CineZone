import { useEffect, useState } from "react";
import { KEY, IMAGEURL } from "../utils/fetching";
import camelcaseKeys from "camelcase-keys";
import NoResults from "./NoResults";

export default function ReviewsSection({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${KEY}`
        );
        const apiData = await response.json();
        const data = camelcaseKeys(apiData, { deep: true });

        setReviews(data.results || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    getReviews();
  }, [movieId]);

  const loadMore = () => setVisibleCount((prev) => prev + 3);
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `On ${date.toLocaleDateString()} At ${date.toLocaleTimeString()}`;
  };

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="reviews">
      <div className="section-heading">
        <div className="title">
          <h3>Reviews</h3>
        </div>
      </div>
      <div className="section-content">
        {reviews.length === 0 ? (
          <NoResults />
        ) : (
          reviews.slice(0, visibleCount).map((review, index) => (
            <div className="review-box" key={index}>
              <div className="review-info">
                <div className="profile-picture">
                  <img
                    src={
                      review.authorDetails.avatarPath
                        ? `${IMAGEURL}w500${review.authorDetails.avatarPath}`
                        : "/images/profile.png"
                    }
                    alt={review.author}
                  />
                </div>
                <div className="user-info">
                  <h4 className="title">{review.author}</h4>
                  <div>
                    <span className="iconed-text">
                      <ion-icon name="star"></ion-icon>{" "}
                      {review.authorDetails.rating || "N/A"}
                    </span>{" "}
                    {formatDate(review.createdAt)}
                  </div>
                </div>
              </div>
              <div className="review-content">
                <p
                  className={`review-text ${
                    expanded[index] ? "expanded" : "clamped"
                  }`}
                >
                  {review.content}
                </p>
                {review.content.split(" ").length > 30 && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="see-more"
                  >
                    {expanded[index] ? "See less" : "See more"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {visibleCount < reviews.length && (
        <div className="more" onClick={loadMore}>
          <ion-icon
            name="ellipsis-horizontal-outline"
            class="toggleable"
          ></ion-icon>
        </div>
      )}
    </section>
  );
}
