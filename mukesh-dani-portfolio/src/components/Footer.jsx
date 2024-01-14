import React from "react";
import { useEffect, useState } from "react";
import "./Footer.scss";

const Footer = () => {

    return (
        <div className="footer text-center">
        <p> 
          &#x3c;&#47;&#x3e; with ❤️ by
          <a href="##" target="_blank">
            {" "}
            Mukesh Dani
          </a>
          😎
        </p>
        <p className="pink-text-gradient">No. of Visitors | <img className="visitcounter" src="https://hitwebcounter.com/counter/counter.php?page=10761101&style=0025&nbdigits=8&type=page&initCount=0" title="Counter Widget" Alt="Visit counter For Websites"   border="0" /></p>

      </div>
    );
  };
  
  export default Footer;