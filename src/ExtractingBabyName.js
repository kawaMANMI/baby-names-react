import React from "react";
import babyNameData from "./data/babyNameData.json";
import "./App.css";
import { GenderMale } from "react-bootstrap-icons";
import { GenderFemale } from "react-bootstrap-icons";

export default function ExtractingBabyName() {
  //   var babyNameSorted = [];
  //   babyNameData.forEach((elm) => babyNameSorted.push(elm.name));
  //   babyNameSorted.sort();
  babyNameData.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  const symbolGender = (gender) => {
    return gender === "f" ? <GenderMale /> : <GenderFemale />;
  };

  const classNameGender = (gender) => {
    return gender === "f" ? "btn btn-primary" : "btn btn-danger btn-kawa";
  };

  return (
    <div class="container">
      {babyNameData.map((babyElm) => (
        // <button className={elm.sex}>{elm.name}</button>
        <button className={classNameGender(babyElm.sex)}>
          {babyElm.name} {symbolGender(babyElm.sex)}
        </button>
      ))}
    </div>
  );
}
