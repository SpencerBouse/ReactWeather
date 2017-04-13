import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      data:[],
      inputValue:'45039'
    }
  }
  componentDidMount(){
    this.reCall()
  }
  render() {
    return (
      <main>
        <h1>Showing weather for {this.state.inputValue}</h1>
        <form onSubmit={this.reCall.bind(this)}>
        <input value={this.state.inputValue} onChange={this.updateInputValue.bind(this)}/>
        <button type="submit" className="btn-primary">Submit</button>
        </form>
        {this.state.data.map(res=>{
          return(<div className="col-md-2 day">
                  <h4>{res.weather[0].description}</h4>
                  <p>Max Temp: {res.temp.max}</p>
                  <p>Min Temp: {res.temp.min}</p>
                </div>)
              })}
      </main>
    );
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  reCall(){
    axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+this.state.inputValue+'&cnt=6&units=imperial&APPID=d0458c4189cf033bf80c84d7a0d38ab0')
    .then((response)=>{
      this.setState({
        data: response.data.list,
      })
    });
  }
}

export default App;
