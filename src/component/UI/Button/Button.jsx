import React from 'react';
import styles from './Button.css';

const button = (props) => {
    return (
        <button {...props} className={styles.Button}>
            {props.children}
        </button>
    );
}

export default button;
