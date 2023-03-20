import { useState, useEffect } from "react";
import './App.css'

const url = "www.themealdb.com/api/json/v1/1/random.php";
function App() {
  const[data, setData] = useState([]);
  const[imgBox, setImgBox] = useState(true);
  const[ingredientsBox, setIngredientsBox] = useState(false);
  const[instructionsBox, setInstructionsBox] = useState(false);
  const [inputList, setComponents] = useState([]);
  const [bannedInputList, setBannedComponents] = useState([]);
  const fetchFoodData = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then(response => response.json())
  //JSON data stored in the variable "data" for the function to use.
  .then(data => {setData(data.meals[0])})
  .catch(error => console.log(error))
  }
  const Input = () => {
    return (<div><p>{data.strMeal}</p><img src={data.strMealThumb} className = "smallerImg"/></div>);
  };
  function ingredientsString(){
    var temp = ""
    for (let i = 1; i < 20; i++)
    {
      if(data[`strIngredient${i}`] != "")
      temp += data[`strIngredient${i}`] + ": "+ data[`strMeasure${i}`] + " "|| '';
    }
    return temp;
  }
  const addComponent = event => {
    setComponents(inputList.concat(<Input key={inputList.length} />));
  }
  const addBannedComponent = event => {
    setBannedComponents(bannedInputList.concat(<Input key={inputList.length} />));
  }
  return (
    <div className="App">
      <div className="page">
        <div className="Title">
        <h1>Meal Generator</h1>
        </div>
        <div className="Buttons">
        <button onClick={fetchFoodData}>Pick a meal for me!</button>
        <button onClick={addComponent}>Favorite</button>
        <button onClick={addBannedComponent}>Ban</button>
        </div>
        {/* Create a section if I have time to make a section for saved recipes. */}
        <div className="FoodCard">
          <div className = "foodName"><h2>{data.strMeal}</h2></div>
          <div className = "option">
            <button className = "buttonImg" onClick={() => {setImgBox( true ), setIngredientsBox( false ), setInstructionsBox( false )}}>Image</button>
            <button className = "buttonIngredients" onClick={() => {setImgBox( false ), setIngredientsBox( true ), setInstructionsBox( false ), ingredientsString}}>Ingredients</button>
            <button className = "buttonInstructions" onClick={() => {setImgBox( false ), setIngredientsBox( false ), setInstructionsBox( true )}}>Instructions</button>
          </div>
          <div className="box">
          <div className = "imgBox">{imgBox && <img src={data.strMealThumb}/>}</div>
          <div className = "ingredientsBox">{ingredientsBox && ingredientsString()}</div>
          <div className = "instructionsBox">{instructionsBox && <p>{data.strInstructions}</p>} </div>
          </div>
        </div>
        <div className="Favorites">
          <p>History:</p>
          {/* List of cards for favorites of foods */}
          <div>
          {inputList}
          </div>
          <div>
            <p>Banned List:</p>
            {bannedInputList}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
