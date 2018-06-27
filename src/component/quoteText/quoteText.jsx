import React from 'react';
import styles from './QuoteText.css';
import Button from '../UI/Button/Button';

const quoteText = (props) => {
    return (
        <div id="text" className={styles.QuoteText}>
            <article className={styles.QuoteContainer}>
                <h2>CATEGORY: {props.category}</h2>
                <p className={styles.TextFadeIn}>"{props.quote}"</p>

                <p className={styles.TextFadeIn} id="author">-{props.author}</p>
            </article>
            <Button
                id="new-quote"
                style={{
                color: props.textColor,
                border: `1px solid ${props.textColor}` 
            }} className={styles.Button}
                onClick={props.newQuoteBtn}> <span>NEW QUOTE</span> </Button>
            <Button className={styles.Button}>
                <a
                    id="tweet-quote"
                    href='twitter.com/intent/tweet'
                    className={styles.tweetQuote}
                    onClick={props.tweetQuote}>
                    <i className="fab fa-twitter"></i>
                    Tweet Quote</a>
            </Button>
        </div>
    )
}

export default quoteText;
