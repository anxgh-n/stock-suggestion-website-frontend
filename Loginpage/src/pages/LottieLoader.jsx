import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../Images/loading.json';  // Make sure to put your Lottie JSON file in the src folder or import path

const LottieLoader = () => {
  const options = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={options} height={400} width={400} />;
};

export default LottieLoader;
