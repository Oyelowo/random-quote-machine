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
    category: '',
    loaded: false,
    randomNum: 0,
    error: '',
    errorEncountered: false,
    url: 'twitter.com/intent/tweet',
    quoteTime: 1000,
    time: 10000,
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

      const {quote, author, cat} = quoteArray[myRandomNum];
      let imagesArray = [...imagesResponse.data.hits];
      imagesArray = imagesArray.reduce((acc, val) => {
        return acc.concat(val.largeImageURL)
      }, []);

      // let myTime = this.getQuoteTimqe(uote, 2000); console.log(this.state.time)
      this.setState({
        quoteData: quoteResponse.data,
        category: cat,
        quote: quote,
        author: author,
        imagesArray: imagesArray,
        loaded: true
      });

      setInterval(this.newQuoteHandler, this.state.time);

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
    this.setState({time: quoteTime});
  }

  randomNumbersBtwInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  newQuoteHandler = () => {
    const {quoteData: quoteArray} = this.state;

    // random number between index 0 and the last index
    const lastIndex = quoteArray.length - 1;
    const myRandomNum = this.randomNumbersBtwInterval(0, lastIndex);
    let imgRandomNum = this.randomNumbersBtwInterval(0, this.state.imagesArray.length - 1);

    const {quote, author, cat: category} = quoteArray[myRandomNum];

    this.setState({quote: quote, author: author, category: category, randomNum: myRandomNum, imgRandomNum: imgRandomNum});
    this.getRandomColor()
  }

  twitterShareHandler = (url, text) => {
    window.open('http://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable' +
        '=0');
  }

  getRandomColor = () => {
    let letters = '0123456789A';
    let lettersCount = letters.split('').length
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * lettersCount)];
    }
    this.setState({dynamicColor: color});
  }

  render() {
    
    let quote = <Spinner/>;
    let error = this.state.errorEncountered
      ? <div
          style={{
          background: `white`,
          textAlign: 'center',
          fontSize: '2rem',
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

          <h1>MY RANDOM QUOTE MACHINE</h1>
          <QuoteText
            category={this.state.category}
            author={this.state.author}
            quote={this.state.quote}
            textColor={this.state.dynamicColor}
            newQuoteBtn={this.newQuoteHandler}
            tweetQuote={() => this.twitterShareHandler(this.state.url, this.state.quoteData[this.state.randomNum].quote + '\n' + this.state.quoteData[this.state.randomNum].author)}/> 

          <Button
            style={{
            color: this.state.dynamicColor,
            backgroundColor: 'white',
            border: `1px solid ${this.state.dynamicColor}`,
            borderRadius: '5px'
          }}>coded By:
            <a
              href="https://www.linkedin.com/in/oyelowo-oyedayo/"
              rel="noopener noreferrer"
              target='_blank'> 
              <i className='fab fa-linkedin'></i> Oyelowo Oyedayo</a>
          </Button>
        </div>

      )
    }
    return <div>{quote}{error}</div>  ;
  }
}

export default MainQuoteBox;