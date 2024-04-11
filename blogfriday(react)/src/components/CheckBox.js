// CheckBox
import React from "react";
export default function CheckBox() {
  return (
    <label>
      <input
        id={id}
        type="checkbox"
        checked={bChecked}
        onChange={(e) => checkHandled(e)}
      />
      {text}
    </label>
  );
}
