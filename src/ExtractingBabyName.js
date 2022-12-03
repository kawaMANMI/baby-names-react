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
  const [favouritesArrayFilter, setFavouritesArrayFilter] = useState([]);

  const [filterGender, setFilterGender] = useState();

  const symbolGender = (gender) => {
    return gender === "m" ? <GenderMale /> : <GenderFemale />;
  };

  const classNameGender = (gender) => {
    return gender === "f" ? "btn btn-primary" : "btn btn-danger btn-kawa";
  };

  function onChangeHandler(event) {
    // console.log(event.target.value);
    setValueSearch(event.target.value);

    const temArray = babyNamesData.filter(
      (babyElm) => babyElm.sex === filterGender || filterGender === ""
    );
    setBabyNamesArray([
      ...temArray.filter((babyElm) =>
        babyElm.name.toLowerCase().includes(event.target.value.toLowerCase())
      ),
    ]);
    // console.log(babyNamesArray.length, temArray.length, event.target.value);
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

  const getRadioValue = (event) => {
    setFilterGender(event.target.value);
    if (event.target.value !== "") {
      setBabyNamesArray(
        babyNamesData.filter(
          (babyData) => babyData.sex === event.target.value
          // &&
          // !favouritesArray.includes(babyData)
        )
      );
      setFavouritesArrayFilter(
        favouritesArray.filter((elm) => elm.sex === event.target.value)
      );
    } else {
      setBabyNamesArray([...babyNamesData]);
    }
  };

  const FavouriteDisplay = (props) => {
    console.log(props.array);
    return (
      <div>
        {props.array.map((babyElm, index) => (
          <>
            {/* <button className={babyElm.sex}>{babyElm.name}</button> */}
            <button
              className={classNameGender(babyElm.sex)}
              key={index}
              onClick={() => handleReturnFavourite(index)}
            >
              {babyElm.name} {symbolGender(babyElm.sex)}
            </button>
          </>
        ))}
      </div>
    );
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
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          value="m"
          onClick={getRadioValue}
        />
        <label className="btn btn-outline-primary" for="btnradio1">
          {symbolGender("m")}
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          onClick={getRadioValue}
          value="f"
          id="btnradio2"
        />
        <label className="btn btn-outline-primary" for="btnradio2">
          {symbolGender("f")}
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          onClick={getRadioValue}
          value=""
          id="btnradio3"
        />
        <label className="btn btn-outline-primary" for="btnradio3">
          All
        </label>
      </div>
      {/* < favouritesArray={favouritesArray} /> */}
      <div className="favouritesContainer">
        Favourite Names(Click):
        {/* <FavouriteDisplay array={favouritesArray} /> */}
        {filterGender ? (
          <FavouriteDisplay array={favouritesArrayFilter} />
        ) : (
          <FavouriteDisplay array={favouritesArray} />
        )}
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
