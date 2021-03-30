import React from "react";
import { Link } from "@fluentui/react";

const NewTabLink = ({ href, children, As = Link }) => {
  return (
    <As
      href={href}
      aria-label="Link will open in new tab"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </As>
  );
};

export default NewTabLink;
