import React from "react";

export const capitalizeFirstLetter = (str) => {
  return str.split(" ").map((s, i, list) => (
    <React.Fragment key={i}>
      <span className="d-inline-block">{s}</span>
      {i < list.length - 1 ? " " : ""}
    </React.Fragment>
  ));
};
