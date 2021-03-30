import React from 'react'
import classes from './Spinner.css';
export default function Spinner() {
    return (
        <div className={classes['sk-chase']}>
            
            <div className={classes['sk-chase-dot']}></div>
            <div className={classes['sk-chase-dot']}></div>
            <div className={classes['sk-chase-dot']}></div>
            <div className={classes['sk-chase-dot']}></div>
            <div className={classes['sk-chase-dot']}></div>
            <div className={classes['sk-chase-dot']}></div>
        </div>
    )
}