import React from 'react';
import NutriFitImage from '../../assets/Nutrifit.jpeg'; 
const NutriFit = () => {
  return (
    <div>
      <h1>Welcome to NutriFit</h1>
      <img src={NutriFitImage} alt="NutriFit"  id='img1' style={{ width: '100%', height: '100%' }} />
      <p>This is the NutriFit page. Here you can find information on nutrition and fitness.</p>
    </div>
  );
};

export default NutriFit;
