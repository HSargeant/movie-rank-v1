import React from 'react';
import logo from "../logo.png"
import lightLogo from "../logo-light.png"
function LogoImage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={lightLogo} alt="Logo" width={400}/>
    </div>
  );
}

export default LogoImage;
