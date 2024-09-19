import React, { useState } from 'react';

const CalorieCalculator = ({ onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [calories, setCalories] = useState(0);

  const calculateCalories = () => {
    let BMR;
    if (gender === 'male') {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    let activityMultiplier;
    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'lightlyActive':
        activityMultiplier = 1.375;
        break;
      case 'moderatelyActive':
        activityMultiplier = 1.55;
        break;
      case 'veryActive':
        activityMultiplier = 1.725;
        break;
      case 'extraActive':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }
    const totalCalories = Math.round(BMR * activityMultiplier);
    setCalories(totalCalories);

    const numericCalories = parseFloat(totalCalories); // Convert to number
    if (!isNaN(numericCalories)) {
      onSubmit(numericCalories); // Pass the numeric value
    } else {
      console.error("Input is not a valid number");
    }
  };

  return (
    <div style={{ maxWidth: '250px', margin: 'auto', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ccc' }}>
    <h5 style={{ color: 'blue', fontSize: '0.9rem', marginBottom: '8px', textAlign: 'center' }}>Calorie Calculator</h5>
    <div style={{ marginBottom: '6px' }}>
      <label style={{ fontSize: '0.7rem', marginRight: '6px', display: 'inline-block', width: '90px' }}>Weight (kg):</label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        style={{ padding: '3px', fontSize: '0.7rem', width: '100px' }}
      />
    </div>
    <div style={{ marginBottom: '6px' }}>
      <label style={{ fontSize: '0.7rem', marginRight: '6px', display: 'inline-block', width: '90px' }}>Height (cm):</label>
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        style={{ padding: '3px', fontSize: '0.7rem', width: '100px' }}
      />
    </div>
    <div style={{ marginBottom: '6px' }}>
      <label style={{ fontSize: '0.7rem', marginRight: '6px', display: 'inline-block', width: '90px' }}>Age (years):</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={{ padding: '3px', fontSize: '0.7rem', width: '100px' }}
      />
    </div>
    <div style={{ marginBottom: '6px' }}>
      <label style={{ fontSize: '0.7rem', marginRight: '6px', display: 'inline-block', width: '90px' }}>Gender:</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        style={{ padding: '3px', fontSize: '0.7rem', width: '106px' }}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div style={{ marginBottom: '6px' }}>
      <label style={{ fontSize: '0.7rem', marginRight: '6px', display: 'inline-block', width: '90px' }}>Activity Level:</label>
      <select
        value={activityLevel}
        onChange={(e) => setActivityLevel(e.target.value)}
        style={{ padding: '3px', fontSize: '0.7rem', width: '106px' }}
      >
        <option value="sedentary">Sedentary</option>
        <option value="lightlyActive">Lightly Active</option>
        <option value="moderatelyActive">Moderately Active</option>
        <option value="veryActive">Very Active</option>
        <option value="extraActive">Extra Active</option>
      </select>
    </div>
    <button
      style={{ backgroundColor: 'green', color: 'white', padding: '5px 8px', margin: '8px 0', border: 'none', fontSize: '0.8rem', width: '100%' }}
      onClick={calculateCalories}
    >
      Calculate
    </button>
    {calories > 0 && (
      <div style={{ marginTop: '8px', color: 'purple', fontSize: '0.8rem', textAlign: 'center' }}>
        Your daily calorie requirement is: {calories}
      </div>
    )}
  </div>
  );
};

export default CalorieCalculator;