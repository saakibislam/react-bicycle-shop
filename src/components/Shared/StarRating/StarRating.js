import { useState } from "react";
import "./StarRating.css";

const StarRating = ({ value = 0, onChange, readOnly = false, size = "1.5rem" }) => {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div
      className={`star-rating${readOnly ? " star-rating--readonly" : ""}`}
      style={{ fontSize: size }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star${display >= star ? " star--filled" : ""}`}
          onClick={() => !readOnly && onChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
