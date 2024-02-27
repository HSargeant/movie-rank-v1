import React from 'react';
import lightLogo from "../logo-light.png"
function LogoImage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={lightLogo} alt="Logo" width={400} />
      <i styles={{ color: "black" }} className={["fa", "fa-thumb-up"].join(" ")} ></i>
    </div>
  );
}

export default LogoImage;
