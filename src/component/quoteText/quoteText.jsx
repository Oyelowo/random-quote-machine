import React from 'react';
import styles from './quoteText.css';
import Button from '../UI/Button/Button';

const quoteText = (props) => {
    return (
        <div id="text" className={styles.quoteText}>
            <article className={styles.QuoteContainer}>
                <p>{props.quote}</p>
                <div id="author">{props.author}</div>
            </article>
            <Button id="new-quote" clicked={props.newQuoteBtn}>NEW QUOTE</Button>
            <Button id="tweet-quote"></Button>
        </div>
    )
}

export default quoteText;
