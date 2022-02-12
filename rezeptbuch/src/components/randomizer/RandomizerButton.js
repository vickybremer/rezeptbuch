import { useState } from "react";
import FullRecipe from "../fullRecipe/fullRecipe.js";
import "./Randomizer.module.css";
import useLocalStorage from "react-use-localstorage";

export default function RandomizerButton() {
  let localData = JSON.parse(localStorage.getItem("recipes"));

  //Prüft, ob bereits Rezepte eingetragen wurden
  let handleRandomize;
  if (localData === null) {
    localData = [];
    handleRandomize = <p>no recipes yet.</p>;
  } else {
    localData = JSON.parse(localStorage.getItem("recipes"));
    handleRandomize = <button onClick={Randomize}> shuffle </button>;
  }

  //Mit Conditional Rendering prüfen, ob schon was in current Recipe steht
  //evtl. mit Conditional Rendering prüfen, dass die gleichen Rezepte nicht hintereinander
  //geshufflet werden können.
  const [currentRecipe, setCurrentRecipe] = useState(null);

  function Randomize() {
    const random = Math.floor(Math.random() * localData.length);
    const RandomRecipe = localData[random].title;

    console.log(RandomRecipe);

    setCurrentRecipe(RandomRecipe);
  }

  return (
    <div>
      {currentRecipe && (
        <FullRecipe
          listData={localData}
          selectedRecipe={currentRecipe}
          closeHandler={() => setCurrentRecipe(null)}
        />
      )}
      <h3>{handleRandomize}</h3>
    </div>
  );
}
