import React, { useState, useRef, useEffect } from "react";

const OverviewText = ({
  text,
  collapsedHeight = 100, // in pixels
  className = "",
  buttonClassName = "",
  textClassName = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleText, setVisibleText] = useState(text);
  const [needsExpansion, setNeedsExpansion] = useState(false);

  const containerRef = useRef(null);
  const testerRef = useRef(null);

  useEffect(() => {
    if (!testerRef.current) return;

    // Check if text overflows container height
    testerRef.current.textContent = text;
    const fullHeight = testerRef.current.scrollHeight;

    if (fullHeight <= collapsedHeight) {
      setVisibleText(text);
      setNeedsExpansion(false);
      return;
    }

    // If too tall: truncate
    setNeedsExpansion(true);
    if (!isExpanded) {
      let low = 0;
      let high = text.length;
      let bestFit = "";

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const trialText = text.slice(0, mid).trim() + "...";
        testerRef.current.textContent = trialText;

        if (testerRef.current.scrollHeight <= collapsedHeight) {
          bestFit = trialText;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      setVisibleText(bestFit);
    } else {
      setVisibleText(text);
    }
  }, [text, collapsedHeight, isExpanded]);

  return (
    <div className={`overview-wrapper ${className}`}>
      {/* Hidden test element to measure text */}
      <div
        ref={testerRef}
        style={{
          visibility: "hidden",
          position: "absolute",
          height: "auto",
          width: "100%",
          overflow: "visible",
          whiteSpace: "normal",
          pointerEvents: "none",
        }}
        className={textClassName}
      />

      {/* Visible Text */}
      <div
        ref={containerRef}
        className={textClassName}
        style={{
          maxHeight: isExpanded ? "none" : `${collapsedHeight}px`,
          overflow: "hidden",
        }}
      >
        {visibleText}
      </div>

      {needsExpansion && (
        <button
          className={buttonClassName}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default OverviewText;
