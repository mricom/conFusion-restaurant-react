import "./App.css";
import { Component } from "react";
import { DISHES } from "./shared/dishes";
import Main from "./components/MainComponent";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default App;
