import React from 'react'
import classes from './Project.css'
export default function Project(props) {
    let percentage = (props.donatedAmount/props.targetAmount) * 100
    let cssClass = ''
    if(!props.isShown){
        cssClass = 'd-none'
    }else if(props.donatedAmount<props.targetAmount){
        cssClass = 'd-none'
    }
    let text = ''
    let disabled = false
    if(props.isOver){
        text = 'This campaign is over'
        disabled=true
    }
    return (
        <div className="row mt-5">
            <div className={`col-12 ${classes.box}`}>
                <p className="font-weight-bold">{props.title}</p>
                <p>Description: {props.description}</p>
                <p>Valid Until: {props.date}</p>
                <p>Target Value: {props.targetAmount}</p>
                <div className={`input-group ${classes.donate}`}><input disabled={disabled} onChange={props.amountHandler} placeholder="Amount in ETH" type="number" className="form-control"/> <button onClick={()=>{props.clickHandler(props.contract)}} className="btn btn-sm btn-primary" disabled={disabled}>Donate</button></div>
                <p className={classes.score}>{props.donatedAmount}/{props.targetAmount} ETH</p>
                <div className={`progress ${classes.progressBar}`}>
                    <div className="progress-bar" role="progressbar" style={{'width':`${percentage}%`}}></div>
                </div>
                <div className={`float-right mt-3 ${cssClass}`}><button disabled={disabled} className='btn btn-primary' onClick={()=>{props.withdrawHandler(props.contract)}}>Withdraw amount</button></div><br></br>
                <h5 className='text-danger'>{text}</h5>
            </div>
        </div>
    )
}
