import React, {Component} from 'react'
import axios from 'axios';
import QuoteText from '../../component/quoteText/quoteText';
import Spinner from '../../component/UI/spinner/Spinner';
// import Button from '../../component/UI/Button/Button';

class MainQuoteBox extends Component {
  state = {
    quoteData: [],
    loaded: false,
    randomNum: 0,
    error: '',
    errorEncountered: false,
    url: 'twitter.com/intent/tweet',
    quoteTime: null,
    time: 10
  }
  async componentDidMount() {
    try {
      const res = await axios.get('https://talaikis.com/api/quotes/');
      this.setState({quoteData: res.data, loaded: true})
      setInterval(this.newQuoteHandler, 15000);
    } catch (error) {
      this.setState({error: error.message, errorEncountered: true});
    }
    

  }

  componentWillUnMount() {
    clearInterval(this.newQuoteHandler)
  }

  getQuoteTime = (quote, eachWordTimeMillisec) => {
    let wordCount = quote
      .split(' ')
      .length;
    let quoteTime = wordCount * eachWordTimeMillisec;
    return quoteTime;
  }

  randomNumbersBtwInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  newQuoteHandler = () => {
    const {quoteData: quoteArray} = this.state;

    // random number between index 0 and the last index
    const lastIndex = quoteArray.length - 1;
    const myRandomNum = this.randomNumbersBtwInterval(0, lastIndex);

    const newQuote = quoteArray[myRandomNum].quote;
    const author = quoteArray[myRandomNum].author;

    // let quoteTime = this.getQuoteTime(newQuote, 20000) console.log(quoteTime);

    this.setState({quote: newQuote, author: author, randomNum: myRandomNum});

  }

  twitterShareHandler = (url, text) => {
    window.open('http://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable' +
        '=0');
  }

  getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    // let quote = this   .state   .quoteData   .map(data => {     return
    // (<QuoteText       key={data.author + data.cat}       author={data.author}
    // quote={data.quote}/>)   })

    let quote = <Spinner/>;
    if (this.state.loaded) {
      quote = (<QuoteText
        author={this.state.quoteData[this.state.randomNum].author}
        quote={this.state.quoteData[this.state.randomNum].quote}
        newQuoteBtn={this.newQuoteHandler}
        tweetQuote={() => this.twitterShareHandler(this.state.url, this.state.quoteData[this.state.randomNum].quote + '\n' + this.state.quoteData[this.state.randomNum].author)}/>)
    }
    let error = this.state.errorEncountered
      ? <div style={{
          backgroundColor: 'white', padding: '20px'
        }}>{this.state.error}. Woops! something went wrong. Please try again!</div>
      : null;

    return (
      <div >
        <h1
          style={{
          background: 'white',
          display: 'inline-block',
          padding: '20px'
        }}>MY RANDOM QUOTE MACHINE</h1>
        {quote}
        <p>{this.state.quoteTime}</p>
        {error}
      </div>
    )
  }
}

export default MainQuoteBox;