import React, {Component} from 'react'
import axios from 'axios';

class MainQuoteBox extends Component {
  state = {
    quoteData: []
  }

  async componentDidMount() {
    const res = await axios.get('https://talaikis.com/api/quotes/');
    // const response = await res.json();
    this.setState({quoteData: res})
    console.log(this.state.quoteData)
  }

  

  render() {
// let quotes = state
    return (
      <div>
        <h1>kkkk</h1>
      </div>
    )
  }
}

export default MainQuoteBox;