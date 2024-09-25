import React, { useState } from 'react';
import './NutritionalValueCalculator.css'

const NutritionalValueCalculator = ({calories}) => {
  const [foods, setFoods] = useState([
    { name: 'Pea Protein', calories: 80, protein: 17, carbs: 1, fat: 1.5 },
    { name: 'Omega 3', calories: 9, protein: 0, carbs: 0, fat: 1 },
    { name: 'shelcal 500', calories: 2, protein: 0.6, carbs: 0.56, fat: 0.1 },
    { name: 'Plain Dosa', calories: 133, protein: 4, carbs: 26, fat: 2 },
    { name: 'Wheat Chapati 1 medium', calories: 115, protein: 3.4, carbs: 18.5, fat: 3.7 },
    { name: 'Salad', calories: 15, protein: 0.8, carbs: 2.9, fat: 0.2 },
    { name: 'Coconut oil(1tbspn)', calories: 117, protein: 0, carbs: 0,fat: 13.7 },
    { name: 'Beetroot(50g)', calories: 22, protein: 0.8, carbs: 5, fat: 0.1 },
    { name: 'Carrot(50g)', calories: 20, protein: 0.5, carbs: 4.3, fat: 0.1 },
    { name: 'Peanut Butter(Homemade/17g/1tsp)', calories: 57, protein: 2.8, carbs: 1.8, fat: 5.9 },
    { name: 'Almonds (soaked, 20g)', calories: 157, protein: 5.8, carbs: 5.7, fat: 13.8 },
    { name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { name: 'Orange', calories: 62, protein: 1.2, carbs: 15, fat: 0.2 },
    { name: 'White SonaMasuri Rice(Organic, 150g)', calories: 196, protein: 4.1, carbs: 42, fat: 0.4 },
    { name: 'White SonaMasuri Rice(150g)', calories: 196, protein: 4.1, carbs: 42, fat: 0.4 },
    { name: 'Black Rice(100g)', calories: 356, protein: 8.86, carbs: 75, fat: 3.3 },
    { name: 'Brown Rice', calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
    { name: 'Dal Curry(100g)', calories: 120, protein: 7, carbs: 20, fat: 1 },
    { name: 'Paneer(100g)', calories: 265, protein: 18, carbs: 1.2, fat: 21 },
    { name: 'Broccoli(100g)', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
    { name: 'Mushroom(100g)', calories: 92, protein: 3.09, carbs: 3.28, fat: 0.34 },
    { name: 'Ladyfinger,Bhindi(100g)', calories: 31, protein: 1.93, carbs: 7.5, fat: 0.19 },
    { name: 'Bittergaurd, Karela(100g)', calories: 16, protein: 0.93, carbs: 3.4, fat: 0.15 },
    { name: 'Soya Chunks(100g)', calories: 345, protein: 52, carbs: 33, fat: 1 },
    { name: 'Palak', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
    { name: 'Rajma (50g)', calories: 67, protein: 5, carbs: 12, fat: 0.3 },
    { name: 'Beans (100g)', calories: 127, protein: 8.7, carbs: 22, fat: 0.5},
    { name: 'Moong (soaked, 50g)', calories: 24, protein: 2.2, carbs: 4.1, fat: 0.2 },
    { name: 'Chana (soaked, 50g)', calories: 77, protein: 4.3, carbs: 13, fat: 1.3 },
    { name: 'Peanuts (50g)', calories: 310, protein: 12, carbs: 16, fat: 26 },
    { name: 'Sprouts (150g)', calories: 93, protein: 7.9, carbs: 13, fat: 1.2 },
    { name: 'Buttermilk', calories: 40, protein: 2.2, carbs: 3.6, fat: 1.5 },
    { name: 'Egg (small egg)', calories: 54, protein: 4, carbs: 0.4, fat: 3.7 },
    { name: 'Chicken Breast (150g)', calories: 248, protein: 47, carbs: 0, fat: 5.4 },
    { name: 'Fish(Banda 100g)', calories: 167, protein: 19.3, carbs: 0, fat: 9.3 },
    { name: 'Fish(Sardine 100g) ', calories: 185, protein: 20.86, carbs: 0.54, fat: 10.45 }
  ]);

  const [selectedServings, setSelectedServings] = useState(new Array(foods.length).fill(0));

  const handleServingsChange = (index, value) => {
    const newSelectedServings = [...selectedServings];
    newSelectedServings[index] = value;
    setSelectedServings(newSelectedServings);
  };

  const getTotalNutrition = () => {
    return foods.reduce(
      (total, food, index) => {
        const servingSize = food.quantity || 1;
        const selectedServing = selectedServings[index];
        total.calories += (food.calories / servingSize) * selectedServing;
        total.protein += (food.protein / servingSize) * selectedServing;
        total.carbs += (food.carbs / servingSize) * selectedServing;
        total.fat += (food.fat / servingSize) * selectedServing;
        return total;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const totalNutrition = getTotalNutrition();
  const totalCalories = totalNutrition.calories;
  const baseCalories = totalCalories; // Adjust as needed

  const proteinPercentage = (totalNutrition.protein / baseCalories) * 100;
  const carbsPercentage = (totalNutrition.carbs / baseCalories) * 100;
  const fatPercentage = (totalNutrition.fat / baseCalories) * 100;

  const totalPercentage = proteinPercentage + carbsPercentage + fatPercentage;

  const expectedCalories = parseFloat(calories); // or Number(calories)
  if (!isNaN(expectedCalories)) {
    console.log(expectedCalories.toFixed(2)); // Use toFixed only if it's a valid number
  } else {
    console.error("ExpectedCalories is not a valid number");
  }
  const expectedProtein = 30*expectedCalories/(100*4);
  const expectedCarbs =  40*expectedCalories/(100*4);
  const expectedFat =  30*expectedCalories/(100*4);
  const proteinPercentageE = (expectedProtein / expectedCalories) * 100;
  const carbsPercentageE = (expectedCarbs / expectedCalories) * 100;
  const fatPercentageE = (expectedFat / expectedCalories) * 100;
  const totalExpectedPercentage = proteinPercentageE + carbsPercentageE + fatPercentageE;


  

  return (
    <div>
      <div className="calculator-container">
      <h2>Nutritional Value Calculator</h2>
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Servings</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, index) => (
            <tr key={index}>
              <td>{food.name}</td>
              <td>
                <select
                  value={selectedServings[index]}
                  onChange={(e) => handleServingsChange(index, parseInt(e.target.value))}
                >
                  <option value={0}>0 servings</option>
                  <option value={1}>1 serving</option>
                  <option value={2}>2 servings</option>
                  <option value={3}>3 servings</option>
                  <option value={4}>4 servings</option>
                  <option value={5}>5 servings</option>
                  <option value={6}>6 servings</option>
                  <option value={7}>7 servings</option>
                  <option value={8}>8 servings</option>
                  <option value={9}>9 servings</option>
                  <option value={10}>10 servings</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 {/*<div style={{overflowX: 'auto'}}> */}
<table>
  <center><h2>Total Nutritional Values</h2></center>
  <tr>
    <th><b>Calories(Goal)</b></th>
    <th><b>Protein</b></th>
    <th><b>Carbohydrates</b></th>
    <th><b>Fat</b></th>
  </tr>

  <tr className="total-row">
    <td>  {expectedCalories}</td>
    <td> {expectedProtein} (30%)</td>
    <td> {expectedCarbs}(40%)</td>
    <td> {expectedFat}(30%)</td>
  </tr>
  <tr>
    <th><b>Currently Selected</b></th>
    <th></th>
    <th></th>
    <th></th>
  </tr>
  <tr>
    <td> {totalNutrition.calories.toFixed(0)}</td>
    <td> {totalNutrition.protein.toFixed(2)}g ({(proteinPercentage / totalPercentage * 100).toFixed(2)}%)</td>
    <td>{totalNutrition.carbs.toFixed(2)}g ({(carbsPercentage / totalPercentage * 100).toFixed(2)}%)</td>
    <td> {totalNutrition.fat.toFixed(2)}g ({(fatPercentage / totalPercentage * 100).toFixed(2)}%)</td>
  </tr>

  <tr className="remaining-row">
    <th><b>Remaining</b></th>
    <th></th>
    <th></th>
    <th></th>
  </tr>
  <tr>
  <td> {expectedCalories.toFixed(2) - totalNutrition.calories.toFixed(2)}</td>
    <td> {(expectedProtein- totalNutrition.protein).toFixed(2)}g ({((((expectedProtein-totalNutrition.protein)/expectedProtein) * 100)).toFixed(2)}%)</td>
    <td> {(expectedCarbs - totalNutrition.carbs).toFixed(2)}g ({((((expectedCarbs - totalNutrition.carbs)/ expectedCarbs) * 100)).toFixed(2)}%)</td>
    <td> {(expectedFat - totalNutrition.fat).toFixed(2)}g ({((((expectedFat - totalNutrition.fat)/ expectedFat) * 100)).toFixed(2)}%)</td>
  </tr>
</table>
<br/>

{/*center>
    <h3>
    <p style={{ color: 'purple' }}>Calories: {calories}</p>
    </h3>
    </center>

 </div>
      <div>
        <h3>Total Nutritional Values</h3>
        <p>Calories: {totalNutrition.calories.toFixed(2)}</p>  
        <p>Protein: {totalNutrition.protein.toFixed(2)}g ({(proteinPercentage / totalPercentage * 100).toFixed(2)}%)</p>
        <p>Carbohydrates: {totalNutrition.carbs.toFixed(2)}g ({(carbsPercentage / totalPercentage * 100).toFixed(2)}%)</p>
        <p>Fat: {totalNutrition.fat.toFixed(2)}g ({(fatPercentage / totalPercentage * 100).toFixed(2)}%)</p>
      </div>
      <div>
        <h3>Remaining</h3>
        <p>Calories: {expectedCalories.toFixed(2) - totalNutrition.calories.toFixed(2)}</p>
        <p>Protein: {(expectedProtein- totalNutrition.protein).toFixed(2)}g ({((((expectedProtein-totalNutrition.protein)/expectedProtein) * 100)).toFixed(2)}%)</p>
        <p>Carbohydrates: {(expectedCarbs - totalNutrition.carbs).toFixed(2)}g ({((((expectedCarbs - totalNutrition.carbs)/ expectedCarbs) * 100)).toFixed(2)}%)</p>
        <p>Fat: {(expectedFat - totalNutrition.fat).toFixed(2)}g ({((((expectedFat - totalNutrition.fat)/ expectedFat) * 100)).toFixed(2)}%)</p>
      </div>
      <div>
        <h3> Goal</h3>
        <p>Calories: 1943</p>  
        <p>Protein: 146 g(40%)</p>
        <p>Carbohydrates: 194 g(30%)</p>
        <p>Fat: 65 g(30%)</p>
      </div>*/}
    </div>
    </div>
  );
};

export default NutritionalValueCalculator;