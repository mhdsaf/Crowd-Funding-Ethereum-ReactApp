import React, { Component } from 'react'
import classes from './Projects.css'
import Project from './Project/Project'
import Web3 from 'web3'
import Spinner from '../Spinner/Spinner'
import moment from 'moment'
export default class Projects extends Component {
    state = ({
        contract: '',
        projects: [],
        spinner: false,
        project: '',
        title:'',
        description: '',
        date: '',
        targetAmount: 0,
        donation: '',
        search: '',
        error:'',
        mining:'',
        account: ''
    })
    async componentDidMount(){
        const accounts = await window.ethereum.enable()
        const account = accounts[0] // metamask address
        this.setState({
            ...this.state,
            spinner: true,
            mining:'',
            account: account
        })
        this.getDataFromBlockchain()
    }
    async getDataFromBlockchain(){
        const web3 = new Web3(Web3.givenProvider)
        let address = "0x2c446f228F79efa8ADb1ee595dB24E5B3B0cD576" // address factory
        let abi = [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "targetAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "date",
                        "type": "string"
                    }
                ],
                "name": "createCampaign",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "deployedCampaigns",
                "outputs": [
                    {
                        "internalType": "contract CrowdfundingCampaign",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getDeployedCampaigns",
                "outputs": [
                    {
                        "internalType": "contract CrowdfundingCampaign[]",
                        "name": "",
                        "type": "address[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
        let contract = new web3.eth.Contract(abi, address)
        await contract.methods.getDeployedCampaigns().call().then((response)=>{
            let arr = []
            let newABI = [
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_targetAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "_title",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_description",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_date",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "creator",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [],
                    "name": "balaceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "completed",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "contribute",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "contributorFund",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "date",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "description",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "donatedAmount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_address",
                            "type": "address"
                        }
                    ],
                    "name": "isContributor",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address payable",
                            "name": "_address",
                            "type": "address"
                        }
                    ],
                    "name": "refund",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "targetAmount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "title",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "transactionCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address payable",
                            "name": "_address",
                            "type": "address"
                        }
                    ],
                    "name": "withdrawAllFunds",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "withdrawn",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
            if(response.length===0){
                this.setState({
                    ...this.state,
                    contract: contract,
                    spinner: false
                })
            }else{
                response.forEach(element => {
                    let obj = {
                        owner: "",
                        title: "",
                        description: "",
                        date: "",
                        targetAmount: "",
                        contract: "",
                        donatedAmount: "",
                        isOver: false,
                        transactions: '',
                        isContributor: '',
                        contributorFund: '',
                        withdrawn: ''
                    }
                    const executeContract = async (newAddress, newABI)=>{
                        let newContract = new web3.eth.Contract(newABI, newAddress)
                        await newContract.methods.owner().call().then((response)=>{
                            obj.owner = response
                        })
                        await newContract.methods.title().call().then((response)=>{
                            obj.title = response
                        })
                        await newContract.methods.description().call().then((response)=>{
                            obj.description = response
                        })
                        await newContract.methods.targetAmount().call().then((response)=>{
                            obj.targetAmount = parseInt(response)/1000000000000000000
                        })
                        await newContract.methods.donatedAmount().call().then((response)=>{
                            obj.donatedAmount = response
                        })
                        await newContract.methods.balaceOf().call().then((response)=>{
                            obj.donatedAmount = (parseInt(obj.donatedAmount) + parseInt(response))/1000000000000000000
                        })
                        await newContract.methods.completed().call().then((response)=>{
                            obj.isOver = response
                        })
                        await newContract.methods.transactionCount().call().then((response)=>{
                            obj.transactions = response
                        })
                        const accounts = await window.ethereum.enable()
                        const account = accounts[0] // metamask address
                        await newContract.methods.isContributor(account).call().then((response)=>{
                            obj.isContributor = response
                        })
                        await newContract.methods.withdrawn().call().then((response)=>{
                            obj.withdrawn = response
                        })
                        await newContract.methods.date().call().then((response)=>{
                            obj.date = response
                            obj.contract = newContract
                            arr.push(obj)
                            this.setState({
                                ...this.state,
                                spinner: false,
                                projects: [...arr],
                                contract: contract
                            })
                        })
                    }
                    executeContract(element, newABI)
                })
            }
        }).catch((err)=>{
            console.log(err)
            this.setState({
                ...this.state,
                spinner: false
            })
        })
    }
    createProjectHandler = async()=>{
        if(this.state.title==='' || this.state.description==='' || this.state.targetAmount<=0 || this.state.date==='' || !moment().isBefore(this.state.date)){
            this.setState({
                ...this.state,
                error: 'Invalid input'
            })
        }else{
            this.inputElement.click();
            this.setState({
                ...this.state,
                spinner: true,
                mining: "Confirm the transaction and wait a couple of minutes for it get mined"
            })
            const accounts = await window.ethereum.enable()
            const account = accounts[0] // metamask address
            await this.state.contract.methods.createCampaign(this.state.targetAmount, this.state.title, this.state.description, this.state.date).send({from: account}).then((response)=>{
                this.getDataFromBlockchain()
            }).catch((err)=>{
                this.setState({
                    ...this.state,
                    spinner: false
                })
            })
        }
    }
    amountHandler = (e)=>{
        this.setState({
            ...this.state,
            donation: e.target.value
        })
    }
    donateHandler = async (contract)=>{
        if (this.state.donation<=0) {
            alert('Invalid donation amount')
        }else{
            // contribute
            this.setState({
                ...this.state,
                spinner: true
            })
            const accounts = await window.ethereum.enable()
            const account = accounts[0] // metamask address
            await contract.methods.contribute(this.state.donation).send({from: account, value: (this.state.donation*1000000000000000000)}).then((response)=>{
                console.log(response)
                this.getDataFromBlockchain()
            }).catch((err)=>{
                this.setState({
                    ...this.state,
                    spinner: false
                })
            })
        }
    }
    withdrawFunds = async(contract)=>{
        this.setState({
            ...this.state,
            spinner: true
        })
        const accounts = await window.ethereum.enable()
        const account = accounts[0] // metamask address
        await contract.methods.withdrawAllFunds(account).send({from: account}).then((response)=>{
            this.getDataFromBlockchain()
        }).catch((err)=>{
            console.log(err)
            this.setState({
                ...this.state,
                spinner: false
            })
        })
    }
    refundHandler = async(contract)=>{
        this.setState({
            ...this.state,
            spinner: true
        })
        const accounts = await window.ethereum.enable()
        const account = accounts[0] // metamask address
        await contract.methods.refund(account).send({from: account}).then((response)=>{
            this.getDataFromBlockchain()
        }).catch((err)=>{
            console.log(err)
            this.setState({
                ...this.state,
                spinner: false
            })
        })
    }
    render() {
        let isShown
        let content = (
            this.state.projects.map((element, key)=>{
                isShown = false
                if(element.owner.toLowerCase()===this.state.account.toLowerCase()){isShown=true}
                if(element.title.toLowerCase().includes(this.state.search.toLowerCase())){
                    return <Project key={key} targetAmount={element.targetAmount} title={element.title} description={element.description} date={element.date} donatedAmount={element.donatedAmount} contract={element.contract} clickHandler={this.donateHandler} amountHandler={this.amountHandler} withdrawHandler={this.withdrawFunds} refundHandler={this.refundHandler} isShown={isShown} isOver={element.isOver} transactions={element.transactions} isContributor={element.isContributor} withdrawn={element.withdrawn}/>
                }
            })
        )
        return (
            <div>
            {this.state.spinner?<div className='mt-5'><div className='text-center text-white'><h5>{this.state.mining}</h5></div><Spinner/></div>:<div className='text-white'>
            <div className="p-4">
                <div onClick={()=>{window.location.pathname=''}} className={`d-inline float-left ${classes.logo}`}>FundIt</div>
                <div className={`d-inline float-right ${classes.links}`}>About Us</div>
            </div>
            <div className="container mb-4">
                <div className={classes.sbar}>
                    <div onChange={(e)=>{this.setState({...this.state, search:e.target.value})}} className="input-group input-group-lg"><input placeholder="Search projects" type="text" className="form-control"/></div>
                </div>
                <a className={classes.mybtn} href="projects.html" data-toggle="modal" data-target="#exampleModal3">Create Project</a>
                <div className="modal fade text-dark" id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModal3Label">Create Project</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                <label>Project Title</label>
                                <input onChange={(e)=>{this.setState({...this.state, title:e.target.value})}} type="text" className="form-control" id="formGroupExampleInput"/>
                                </div>
                                <div className="form-group">
                                <label >Project Description</label>
                                <input onChange={(e)=>{this.setState({...this.state, description:e.target.value})}} type="text" className="form-control" id="formGroupExampleInput2"/>
                                </div>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input onChange={(e)=>{this.setState({...this.state, date:e.target.value})}} type="date" className="form-control" id="formGroupExampleInput3"/>
                                </div>
                                <div className="form-group">
                                    <label >Target Amount (ETH)</label>
                                    <input onChange={(e)=>{this.setState({...this.state, targetAmount:e.target.value})}} type="number" className="form-control" id="formGroupExampleInput4"/>
                                </div>
                                <div className='text-danger'>{this.state.error}</div>
                            </form>
                        </div>
                        <div className="modal-footer">
                        <button ref={input => this.inputElement = input} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button onClick={this.createProjectHandler} type="button" className="btn btn-primary">Create</button>
                        </div>
                    </div>
                    </div>
                </div>
                {content}
            </div>
        </div>}
        </div>
        )
    }
}