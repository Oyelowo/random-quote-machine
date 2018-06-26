import React, {Component} from 'react'
import axios from 'axios';
import QuoteText from '../../component/quoteText/quoteText';
import Spinner from '../../component/UI/spinner/Spinner';
import styles from './MainQuoteBox.css';
import Button from '../../component/UI/Button/Button';

class MainQuoteBox extends Component {
  state = {
    quoteData: [],
    quote: '',
    author: '',
    loaded: false,
    randomNum: 0,
    error: '',
    errorEncountered: false,
    url: 'twitter.com/intent/tweet',
    quoteTime: 1000,
    time: 10,
    imagesArray: [],
    imgRandomNum: 0,
    dynamicColor: '#000'
  }
  async componentDidMount() {
    try {
      const [quoteResponse,
        imagesResponse] = await Promise.all([
        axios.get('https://talaikis.com/api/quotes/'),
        axios.get('https://pixabay.com/api/?key=9392509-1ebd5d1cb57ec9a0bc4ec3aa0&q=nature&image_ty' +
            'pe=photo')
      ]);

      const quoteArray = [...quoteResponse.data];

      // random number between index 0 and the last index
      const lastIndex = quoteArray.length - 1;
      const myRandomNum = this.randomNumbersBtwInterval(0, lastIndex);

      const {quote, author} = quoteArray[myRandomNum];
      let imagesArray = [...imagesResponse.data.hits];
      imagesArray = imagesArray.reduce((acc, val) => {
        return acc.concat(val.largeImageURL)
      }, []);

      this.setState({quoteData: quoteResponse.data, quote: quote, author: author, imagesArray: imagesArray, loaded: true});

      setInterval(this.newQuoteHandler, 10000);
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

  newQuoteHandler = (quoteTime) => {
    const {quoteData: quoteArray} = this.state;

    // random number between index 0 and the last index
    const lastIndex = quoteArray.length - 1;
    const myRandomNum = this.randomNumbersBtwInterval(0, lastIndex);
    let imgRandomNum = this.randomNumbersBtwInterval(0, this.state.imagesArray.length - 1);

    const {quote, author} = quoteArray[myRandomNum];

    quoteTime = this.getQuoteTime(quote, 20000);

    this.setState({quote: quote, quoteTime: quoteTime, author: author, randomNum: myRandomNum, imgRandomNum: imgRandomNum});
    this.getRandomColor()
  }

  twitterShareHandler = (url, text) => {
    window.open('http://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable' +
        '=0');
  }

  getRandomColor = () => {
    let letters = '0123456789A';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 11)];
    }
    this.setState({dynamicColor: color});
  }

  render() {
    // let quote = this   .state   .quoteData   .map(data => {     return
    // (<QuoteText       key={data.author + data.cat}       author={data.author}
    // quote={data.quote}/>)   })

    let quote = <Spinner/>;
    let error = this.state.errorEncountered
      ? <div
          style={{
          backgroundColor: 'white',
          padding: '20px'
        }}>{this.state.error}. Woops! something went wrong. Please try again!</div>
      : null

    if (this.state.loaded) {
      quote = (
        <div
          className={styles.FullScreen}
          style={{
          backgroundImage: `url(${this.state.imagesArray[this.state.imgRandomNum]})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          color: this.state.dynamicColor
        }}>

          <h1
            style={{
            background: 'white',
            display: 'inline-block',
            padding: '20px'
          }}>MY RANDOM QUOTE MACHINE</h1>
          <QuoteText
            author={this.state.author}
            quote={this.state.quote}
            textColor={this.state.dynamicColor}
            newQuoteBtn={this.newQuoteHandler}
            tweetQuote={() => this.twitterShareHandler(this.state.url, this.state.quoteData[this.state.randomNum].quote + '\n' + this.state.quoteData[this.state.randomNum].author)}/> {error}

          <Button
            style={{
            color: this.state.dynamicColor,
            backgroundColor: 'white',
            border: `1px solid ${this.state.dynamicColor}`,
            borderRadius: '5px'

          }}>coded By:  
            <a href="https://www.linkedin.com/in/oyelowo-oyedayo/" rel="noopener noreferrer" target='_blank'> Oyelowo Oyedayo</a>
          </Button>
        </div>

      )
    }
    return quote;
  }
}

export default MainQuoteBox;