import React from 'react';
import styles from './quoteText.css';
import Button from '../UI/Button/Button';

const quoteText = (props) => {
    return (
        <div className={styles.quoteText}>
            <p>{props.quote}</p>
            <div>{props.author}</div>
            <Button clicked={props.nextBtn}>NEXT</Button>
            <Button clicked={props.prevBtn}>PREVIOUS</Button>
        </div>
    )
}

export default quoteText;
