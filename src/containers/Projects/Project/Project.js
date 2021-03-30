import React from 'react'
import classes from './Project.css'
export default function Project(props) {
    return (
        <div className="row mt-5">
            <div className={`col-12 ${classes.box}`}>
                <p className="font-weight-bold">{props.title}</p>
                <p>Description: {props.description}</p>
                <p>Valid Until: {props.date}</p>
                <p>Target Value: {props.targetAmount}</p>
                <div className={`input-group ${classes.donate}`}><input placeholder="Amount in ETH" type="number" className="form-control"/> <button className="btn btn-sm btn-primary">Donate</button></div>
                <p className={classes.score}>1.2/4 ETH</p>
                <div className={`progress ${classes.progressBar}`}>
                    <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    )
}
