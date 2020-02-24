import React from "react";
import { Text, StyleSheet } from 'react-native';
import Carousel from "@brainhubeu/react-carousel/lib/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import Character from './faces.js';

import Image1 from "./assets/icon.png";
import Image2 from "./assets/icon.png";
import Image3 from "./assets/icon.png";
import Image4 from "./assets/icon.png";
import Image5 from "./assets/icon.png";

class MyCarousel extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      valueY: 1,
      slides: {},
    };

    this.onChange = this.onChange.bind(this);
  };

  componentDidMount = () => {
    // update neighbours and set the slides in the state object
    this.character = new Character(113);
    this.character.updNeighbours(this);
  };

  onChange(value, valueY) {

    // update the slides 
    this.character.setId(this.character.getIdByName(this.character.getCurrentDisplayName(value, valueY)));
    this.character.updNeighbours(this);

    this.setState({
      value: value,
      valueY: valueY,
    });
  };


  render() {
    return (
      <div
        className="App"
        style={{ width: "600px", margin: "auto", padding: "50px" }}
      >
        <Carousel
          slides={this.state.slides}
          arrows
          rowCount={3}
          value={this.state.value}
          valueY={this.state.valueY}
          onChange={this.onChange}>
        </Carousel>
      </div>
    );
  }
}
export default MyCarousel;