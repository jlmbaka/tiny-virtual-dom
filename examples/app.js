import { Component, createElement, render } from "../src/lib.js";

class List extends Component {
  constructor() {
    super();
    this.state = { items: [] };

    setInterval(() => {
      this.setState({
        items: [...this.state.items, "item"],
      });
    }, 2000);
  }

  render() {
    return createElement(
      "ul",
      ...this.state.items.map((item) => createElement("li", item))
    );
  }
}

const App = createElement(
  "div",
  createElement("h1", "Hello VDOM"),
  createElement(List)
);

render(App, document.body);
