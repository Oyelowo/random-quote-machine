import React, {Component} from 'react';
// import './App.css';
import MainQuoteBox from './container/QuoteBox/MainQuoteBox'
import styles from './App.css';
import Background from './assets/natureImages/img1.jpg'

class App extends Component {

  // componentDidMount(){   setInterval(()=> , 2000) }

  render() {

    return (
      <div id="quote-box">
        <MainQuoteBox/>
      </div>
    );
  }
}

export default App;
