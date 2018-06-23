import React, {Component} from 'react'
import axios from 'axios';
import QuoteText from '../../component/quoteText/quoteText';
import Spinner from '../../component/UI/spinner/Spinner';
// import Button from '../../component/UI/Button/Button';

class MainQuoteBox extends Component {
  state = {
    quoteData: [],
    loaded: false,
    count: 0,
    error: '',
    randomNumArr: [],
    url: 'twitter.com/intent/tweet'
  }

  async componentDidMount() {
    try {
      const res = await axios.get('https://talaikis.com/api/quotes/');
      // const response = await res.json();
      this.setState({quoteData: res.data, loaded: true})
      console.log(this.state.quoteData)
    } catch (error) {
      console.log(error);
      this.setState({error: error})
    }
  }

  randomNumbersBtwInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  newQuoteHandler = () => {
    const updatedQuotes = {
      ...this.state
    }

    const quoteArray = [...updatedQuotes.quoteData]

    // random number between index 0 and the last index
    const lastIndex = quoteArray.length - 1;
    const myRandomNum = this.randomNumbersBtwInterval(0, lastIndex);

    const newQuote = quoteArray[this.state.count].quote;
    const author = quoteArray[this.state.count].author;
    this.setState({quote: newQuote, author: author, count: myRandomNum});
  }

  twitterShareHandler = (url, text) => {
    window.open('http://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable' +
        '=0');
  }

  render() {
    // let quote = this   .state   .quoteData   .map(data => {     return
    // (<QuoteText       key={data.author + data.cat}       author={data.author}
    // quote={data.quote}/>)   })

    if (this.state.loaded) {
      setTimeout(this.newQuoteHandler, 15000);
    }
    let quote = <Spinner/>;
    if (this.state.loaded) {
      quote = (<QuoteText
        author={this.state.quoteData[this.state.count].author}
        quote={this.state.quoteData[this.state.count].quote}
        newQuoteBtn={this.newQuoteHandler}
        tweetQuote={()=>this.twitterShareHandler(this.state.url, this.state.quoteData[this.state.count].quote)}/>)
    }

    return (
      <div>
        <h1>MY RANDOM QUOTE MACHINE</h1>
        {quote}

      </div>
    )
  }
}

export default MainQuoteBox;