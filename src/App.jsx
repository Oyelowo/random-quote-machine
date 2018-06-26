import React, {Component} from 'react';
// import './App.css';
import MainQuoteBox from './container/QuoteBox/MainQuoteBox'
import styles from './App.css';
import Background from './assets/natureImages/pexels-photo-257360.jpg';

class App extends Component {

  render() {
    return (
      <div
        id="quote-box"
        style={{
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }}
        className={styles.App}>
        <MainQuoteBox/>
      </div>
    );
  }
}

export default App;
