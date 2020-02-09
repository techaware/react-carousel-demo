import React from "react";
import { Text, StyleSheet } from 'react-native';
import Carousel from "@brainhubeu/react-carousel/lib/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import Image1 from "./assets/icon.png";
import Image2 from "./assets/icon.png";
import Image3 from "./assets/icon.png";
import Image4 from "./assets/icon.png";
import Image5 from "./assets/icon.png";
const App = () => (
    <div
      className="App"
      style={{ width: "600px", margin: "auto", padding: "50px" }}
    >
      <Carousel arrows >
        <img src={Image1} />
        <img src={Image2} />
        <img src={Image3} />     
      </Carousel>
    </div>
);

export default App;