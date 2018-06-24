import React, {Component} from 'react';
// import './App.css';
import MainQuoteBox from './container/QuoteBox/MainQuoteBox'
import styles from './App.css';

class App extends Component {

  render() {
    return (
      <div id="quote-box" className={styles.App}>
        <MainQuoteBox />
      </div>
    );
  }
}

export default App;
