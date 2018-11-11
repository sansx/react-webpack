import React from 'react';
 
import template from './Index.pug';      // ← import pug template
 
export default class Report extends React.Component {
  render() {
    const {
      items,
      period,
    } = this.props;
 
    return template.call(this, {        // ← use transpiled function
      // variables
      items,
      period,
      // components
    });
  }
};
