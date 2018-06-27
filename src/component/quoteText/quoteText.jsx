import React from 'react';
import styles from './quoteText.css';
import Button from '../UI/Button/Button';

const quoteText = (props) => {
    return (
        <div id="text" className={styles.quoteText}>
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
            }}
                onClick={props.newQuoteBtn}>NEW QUOTE</Button>
            <Button>
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
