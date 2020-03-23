import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";

export default function ({
  index,
  data = {},
  onBlur = () => {},
  onRemove = () => {},
} = {}) {
  const { id = uuid(), header: initialHeader, value: initialValue } = data;

  const [header, setHeader] = useState(initialHeader);
  const [value, setValue] = useState(initialValue);

  const update = (field, inputValue) => {
    field === "header" ? setHeader(inputValue) : setValue(inputValue);
  };

  useEffect(() => {
    if (header && value) onBlur({ id, header, value });
  }, [header, value]);

  return (
    <div className="columns Header" aria-label="header">
      <div className="control column">
        <input
          className="input"
          placeholder="header"
          value={header}
          aria-label="header-key"
          onChange={(e) => update("header", e.target.value)}
        />
      </div>
      <div className="control column">
        <input
          className="input"
          placeholder="value"
          value={value}
          aria-label="header-value"
          onChange={(e) => update("value", e.target.value)}
        />
      </div>
      <div
        className="control column is-1 Header__Remove"
        onClick={() => onRemove(id)}
      >
        <i className="far fa-times-circle" aria-label="remove-header" />
      </div>
    </div>
  );
}
