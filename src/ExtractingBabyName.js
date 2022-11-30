import { React, useState } from "react";
import babyNamesData from "./data/babyNameData.json";
import "./App.css";
import { GenderMale } from "react-bootstrap-icons";
import { GenderFemale } from "react-bootstrap-icons";

export default function ExtractingBabyName() {
  //   var babyNameSorted = [];
  //   babyNameData.forEach((elm) => babyNameSorted.push(elm.name));
  //   babyNameSorted.sort();
    const [babyNamesArray, setBabyNamesArray] = useState(babyNamesData);

  babyNamesArray.sort((a, b) => {
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

  const [valueSearch, setValueSearch] = useState("");
  const [favouritesArray, setFavouritesArray] = useState([]);

  const symbolGender = (gender) => {
    return gender === "f" ? <GenderMale /> : <GenderFemale />;
  };

  const classNameGender = (gender) => {
    return gender === "f" ? "btn btn-primary" : "btn btn-danger btn-kawa";
  };

  function onChangeHandler(event) {
    // console.log(event.target.value);
    setValueSearch(event.target.value);
    // console.log(valueSearch);
    setBabyNamesArray(
      babyNamesData.filter((babyElm) =>
        babyElm.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  }

  const handleFavourite = (index) => {
    const favouriteBabyName = babyNamesArray[index];

    setBabyNamesArray(
      babyNamesArray.filter((babyData) => babyData !== babyNamesArray[index])
    );

    favouritesArray.push(favouriteBabyName);
    setFavouritesArray([...favouritesArray]);
    // console.log(favouritesArray);
  };

  const handleReturnFavourite = (index) => {
     const returnFavouriteBabyName = favouritesArray[index];

    setFavouritesArray(
      favouritesArray.filter((babyData) => babyData !== favouritesArray[index])
    );

     babyNamesArray.push(returnFavouriteBabyName);
     setBabyNamesArray([...babyNamesArray]);
    // console.log(favouritesArray);
  };
  return (
    <div className="container">
      <div className="liveSearch">
        Live Search
        <input
          value={valueSearch}
          onChange={onChangeHandler}
          placeholder="Type something to search"
        />
      </div>
      {/* < favouritesArray={favouritesArray} /> */}
      <div className="favouritesContainer">
        Favourite Names(Click):
        {favouritesArray.map((babyElm, index) => (
          // <button className={elm.sex}>{elm.name}</button>
          <button
            className={classNameGender(babyElm.sex)}
            key={index}
            onClick={() => handleReturnFavourite(index)}
          >
            {babyElm.name} {symbolGender(babyElm.sex)}
          </button>
        ))}
        <hr />
      </div>
      {babyNamesArray.map((babyElm, index) => (
        // <button className={elm.sex}>{elm.name}</button>
        <button
          className={classNameGender(babyElm.sex)}
          key={index}
          onClick={() => handleFavourite(index)}
        >
          {babyElm.name} {symbolGender(babyElm.sex)}
        </button>
      ))}
    </div>
  );
}
