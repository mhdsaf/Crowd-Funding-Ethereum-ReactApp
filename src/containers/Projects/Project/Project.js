import React from 'react'
import classes from './Project.css'
import moment from 'moment'
export default function Project(props) {
    let percentage = (props.donatedAmount/props.targetAmount) * 100
    let cssClass = ''
    let cssClass1 = 'd-none'
    let text = ''
    let contribution = <span className='text-danger'> You havent contributed to this campaign </span>
    let disabled = false
    let disabled1 = false
    if(!props.isShown){ // if not owner, then hide "withdraw" button
        cssClass = 'd-none'
    }else if(props.donatedAmount<props.targetAmount){ // if owner, but you havent reached target amount, then hide "withdraw" button
        cssClass = 'd-none'
    }
    if(props.isOver || !moment().isBefore(props.date)){ // if campaign target is reached, or date expired, then show this message
        text = 'This campaign is over'
        disabled=true
    }
    if(props.isContributor && !props.isOver && !moment().isBefore(props.date)){ // if user is contributor, campaign target is not reached, and date expired then show "refund" button
        cssClass1 = ''
    }
    if(props.isContributor){ // if user is contributor, then show this message
        contribution = <span className='text-primary'> You contributed to this campaign </span>
    }
    if(props.isShown){ // if owner, then show this message
        disabled = true
        contribution = <span className='text-primary'> You are the owner of this campaign </span>
    }
    if(props.withdrawn){ // if owner withdraw the money, then disable withdraw button
        disabled1 = true
        text = text + ' and owner withdrew the ethers.'
    }
    return (
        <div className="row mt-5">
            <div className={`col-12 ${classes.box}`}>
                <p className="font-weight-bold">{props.title}</p>
                <p>Description: {props.description}</p>
                <p>Valid Until: {props.date}</p>
                <p>Target Value: {props.targetAmount} ETH</p>
                <p>Transactions made: {props.transactions}. {contribution}</p>
                <div className={`input-group ${classes.donate}`}><input disabled={disabled} onChange={props.amountHandler} placeholder="Amount in ETH" type="number" className="form-control"/> <button onClick={()=>{props.clickHandler(props.contract)}} className="btn btn-sm btn-primary" disabled={disabled}>Donate</button></div>
                <p className={classes.score}>{props.donatedAmount}/{props.targetAmount} ETH</p>
                <div className={`progress ${classes.progressBar}`}>
                    <div className="progress-bar" role="progressbar" style={{'width':`${percentage}%`}}></div>
                </div>
                <div className={`float-right mt-3 ${cssClass}`}><button disabled={disabled1} className='btn btn-primary' onClick={()=>{props.withdrawHandler(props.contract)}}>Withdraw amount</button></div><div className="float-right mt-3"><button className={`btn btn-primary ${cssClass1}`} onClick={()=>{props.refundHandler(props.contract)}}>Refund</button></div>
                <h5 className='text-danger mt-3'>{text}</h5>
            </div>
        </div>
    )
}
