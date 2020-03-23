import React from "react";

const RouteItem = ({ title, value }) => {
  const buildAriaLabel = (label) =>
    label
      ? `route-${title.toLowerCase()}-${label}`
      : `route-${title.toLowerCase()}`;

  return (
    <div className="level-item has-text-centered" aria-label={buildAriaLabel()}>
      <div>
        <p className="heading" aria-label={buildAriaLabel("title")}>
          {title}
        </p>
        <p className="title is-size-6" aria-label={buildAriaLabel("value")}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default RouteItem;
