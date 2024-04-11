// CheckBoxList
import React, { useState } from "react";
import CheckBox from "./CheckBox";
export default function App() {
  const checkList = [
    ...Array(5)
      .fill("체크")
      .map((v, i) => v + i),
  ];

  return (
    <>
      <header>
        <label>
          <input type="checkbox" onChange={(e) => allCheckedHandler(e)} />
          전체선택
        </label>
      </header>
      <div>
        {checkList.map((issue, index) => (
          <CheckBox key={index} id={`id` + index} />
        ))}
      </div>
    </>
  );
}
