import React from 'react';
import styles from './quoteText.css';
import Button from '../UI/Button/Button';

const quoteText = (props) => {
    return (
        <div id="text" className={styles.quoteText}>
            <article className={styles.QuoteContainer}>
                <p className={styles.TextFadeIn}>{props.quote}</p>
                <div className={styles.TextFadeIn} id="author">{props.author}</div>
            </article>
            <Button id="new-quote" onClick={props.newQuoteBtn}>NEW QUOTE</Button>
            <a id="tweet-quote" href='twitter.com/intent/tweet' onClick={props.tweetQuote}>TweetQuote</a>
        </div>
    )
}

export default quoteText;
