
import React, { Component } from 'react';
import Autocomplete from  'react-autocomplete';


class AutocompletePage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
    }
  }


  getOptions(){
    console.log("get opts");
    var res = [];
    for(var i =0;i<this.props.options.length;i++){
      if (this.props.options[i][0] ){
        res.push({id:this.props.options[i][0],label:this.props.options[i][0]});
      }
    }
    console.log(res);
    return res;
  }

  render() {

    return (
      <Autocomplete
        items={this.getOptions()}
        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) =>
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
          >
            {item.label}
          </div>
        }
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={value => this.setState({ value })}
      />
    )
  }
}



export default AutocompletePage;