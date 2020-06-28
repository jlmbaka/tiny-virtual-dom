// createElement creates a nested tree  of objects
function createElement(type, ...children) {
  return { type, children };
}

class Component {
  constructor() {
    this.state = {};
  }

  setState(partialState) {
    this.state = {
      ...this.state,
      ...partialState,
    };
    updateComponent(this);
  }
}
Component.isComponent = true;

function diff(oldElement, newElement) {
  // here we simply check  if there are  new childs but
  //  we can take it further by comparing everything
  // (type, a  new child),
  const hasNewChildren =
    oldElement.childNodes.length !== newElement.children.length;
  if (hasNewChildren) {
    oldElement.appendChild(
      renderNode(newElement.children[newElement.children.length - 1]) // only append the last child
    );
  }
  return oldElement;
}

function updateComponent(component) {
  const oldElement = component.baseElement; // real dom  element
  const newElement = component.render(); //  virtual (plan js element)

  component.baseElement = diff(oldElement, newElement);
}

// renderNode is responsible for taking a plain JS tree
// of objects and create real DOM elements
function renderNode(node) {
  const { type, children } = node;

  if (type.isComponent) {
    const instance = new type();
    const virtualElement = instance.render();
    const element = renderNode(virtualElement);

    instance.baseElement = element;

    return element;
  }

  if (typeof type === "string") {
    const element = document.createElement(type);

    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(renderNode(child));
      }
    });
    return element;
  }
}

function render(node, element) {
  element.appendChild(renderNode(node));
}
