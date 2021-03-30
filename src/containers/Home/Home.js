import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import classes from './Home.css'
class Home extends Component {
    render() {
        return (
            <section className={classes.showcase}>
                <header>
                    <p className={`${classes.logo} ${classes.lead}`}>FundIt</p>
                    <div><a className={classes.links} href="hello">About Us</a></div>
                </header>
                <div className={classes.overlay}></div>
                <div className={classes.text}>
                    <h3>Funding Your Projects</h3> 
                    <h3>Into The Future</h3>
                    <p>A secured and decentralized blockchain-based platform with the purpose of funding your project. FundIt is an open platform for crowdfunding campaigns that runs on an Ethereum Smart Contract. You can launch any project and get funds through Ethers.</p>
                    <a onClick={()=>{window.location.pathname = 'projects'}} style={{'cursor':'pointer'}}>Explore</a>
                </div>
            </section>
        )
    }
}
export default withRouter(Home)