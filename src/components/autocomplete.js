
import React, { Component } from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';



class AutocompletePage extends Component {

  constructor(props){
    super(props);
    this.state = {multiple:false};
  }

  componentDidMount(){
    window.JFCustomWidget.sendData({value:null});
  }


  render() {
    const {multiple} = false;
    return (
        <Typeahead
          labelKey="name"
          multiple={multiple}
          options={this.props.options}
          placeholder="Search"
          onChange={(selected) => { 
            console.log(selected);
            if ( this.props.options.includes(selected[0])){
            console.log("Includes");
            window.JFCustomWidget.sendData({value:selected});
          }
          } }
        />);
  }
}


export default AutocompletePage;



