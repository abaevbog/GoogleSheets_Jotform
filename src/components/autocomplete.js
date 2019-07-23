
import React, { Component } from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';



class AutocompletePage extends Component {

  constructor(props){
    super(props);
    this.state = {multiple:false};
    this.getOptions = this.getOptions.bind(this);
  }

  getOptions(){
    console.log("get opts");
    var res = [];
    for(var i =0;i<this.props.options.length;i++){
      if (this.props.options[i][0] ){
        res.push(this.props.options[i][this.props.columnIndex]);
      }
    }
    console.log(res);
    return res;
  }

  render() {
    const {multiple} = false;
    return (
        <Typeahead
          labelKey="name"
          multiple={multiple}
          options={this.getOptions()}
          placeholder="Look up by name"
        />);
  }
}


export default AutocompletePage;



