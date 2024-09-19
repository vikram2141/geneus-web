import React, { useState } from 'react';
import NutritionalValueCalculator from './NutritionalValueCalculator';
import CalorieCalculator from './CalorieCalculator';

const NutritionalAndCalorieCalculator = () => {
  const [calories, setCalories] = useState(0); // Initialize state

    const handleCaloriesSubmit = (calories) => {
        setCalories(calories);
    };
  return (
    <div>
      <h4 style={{ textAlign: 'center' }}>Nutritional and Calorie Calculators</h4>

      <div style={{ padding: '0px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
           <CalorieCalculator onSubmit={handleCaloriesSubmit} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '0px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
            {calories !== null && <NutritionalValueCalculator calories={calories} />}
        </div>
      </div>
    </div>
  );
};

export default NutritionalAndCalorieCalculator;
