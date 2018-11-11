import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
import { Hello } from "./Hello.tsx"
import Temp from "./text"

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seo_title: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    const { seo_title } = this.state;
    return (

      <form id="article-form">
        <Temp period={{start:"1",end:"5"}}></Temp>
        <Hello compiler="TypeScript" framework="React" />
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}
export default FormContainer;

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;