import React, {Component} from 'react'
import axios from 'axios';
import QuoteText from '../../component/quoteText/quoteText';
import Spinner from '../../component/UI/spinner/spinner';
import Button from '../../component/UI/Button/Button';

class MainQuoteBox extends Component {
  state = {
    quoteData: [],
    loaded: false,
    count: 0,
    error: ''
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

  nextQuoteHandler = () => {
    const updatedQuotes = {
      ...this.state
    }

    const quoteArray = [...updatedQuotes.quoteData]
    const next = this.state.count < quoteArray.length - 1
      ? this.state.count + 1
      : 0;
    const quote = quoteArray[next].quote
    const author = quoteArray[next].author
    this.setState({quote: quote, author: author, count: next})
  }

  previousQuoteHandler = () => {
    const updatedQuotes = {
      ...this.state
    }

    const quoteArray = [...updatedQuotes.quoteData]
    const previous = this.state.count > 0
      ? this.state.count - 1
      : quoteArray.length - 1
    this.setState({count: previous})
  }

  render() {
    // let quote = this   .state   .quoteData   .map(data => {     return
    // (<QuoteText       key={data.author + data.cat}       author={data.author}
    // quote={data.quote}/>)   })

    // setTimeout(this.nextQuoteHandler, 5000);

    let quote = <Spinner/>;
    if (this.state.loaded) {
      quote = (<QuoteText
        author={this.state.quoteData[this.state.count].author}
        quote={this.state.quoteData[this.state.count].quote}
        nextBtn={this.nextQuoteHandler}
        prevBtn={this.previousQuoteHandler}/>)
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