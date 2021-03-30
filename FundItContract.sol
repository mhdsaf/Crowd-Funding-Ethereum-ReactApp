// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

//factory pattern for creating CrowdfundingCampaign contract objects 
//1) deploy a factory
//2) create a campaign from the factory
//3) get (copy) this campaign's addresses using getDeployedCampaigns
//4) go to deplay change from CrowdfundingCampaignFactory to CrowdfundingCampaign, paste the address of the previously deployed campaign under the "At Address" field
contract CrowdfundingCampaignFactory{
    CrowdfundingCampaign[] public deployedCampaigns; //stores addresses of the deployed deployed campaigns 
    
    function createCampaign(uint targetAmount, string memory title, string memory description, string memory date) public {
        CrowdfundingCampaign newCampaign = new CrowdfundingCampaign(targetAmount, title, description, date, msg.sender); //the one who deployed the campaign will be its owner
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (CrowdfundingCampaign[] memory){
        return deployedCampaigns;
    }
}

contract CrowdfundingCampaign{
    string public title;
    string public description;
    string public date;
    address public owner; //variable that stores the address of the owner of the contract
    mapping(address => bool) contributors; //mapping is like a hash we are mapping an adress to a bool to keep track of contributors: their adress is mapped if they are a contributor (true or false)
    uint public contributorsCount;
    uint public targetAmount;
    
    //Struct for when the Withdrawal will be made
    struct Withdrawal{
        string description; //why withrawal will be made
        uint value;
        address recipient; //who is withdrawing
        bool complete; //mark if the withdrawal is completed
        uint approvalCount; // make sure we have exact number of approvals
        mapping(address => bool) approvals; //make sure no one can approve twice
    }
    
    //Array of withdrawals
    Withdrawal[] public withdrawals;
    
    //constructor function whenever an instance of the contract is made
    constructor(uint _targetAmount, string memory _title, string memory _description, string memory _date, address creator) public {
        owner = creator;
        title = _title;
        date = _date;
        description = _description;
        targetAmount = _targetAmount;
    }
    
    //payable means he will be paying through the function
    function contribute() public payable {
        require(msg.value >= targetAmount); //Contribution (msg.value comes from the key word payable) must be greater or equal to minimum
        contributors[msg.sender]= true; //add the contributor's adress (msg.sender comes from keyword payable )to the contributors mapp
        contributorsCount++;
    }
    
    //modifier to make sure some functions can be only called by owner
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    
    //modifier to make sure some functions can be only called by contributor
    modifier onlyContributor(){
        require(contributors[msg.sender]);
        _;
    }
    
    //Ability for the owner of the contract to create a withdrawl request
    //When the contract get 50% approval from contributors contract will be able to release the funds
    function createWithdrawal(string memory description, uint value, address recipient) public onlyOwner {
        Withdrawal storage newWithdrawal = withdrawals.push();
                newWithdrawal.description = description;
                newWithdrawal.value = value;
                newWithdrawal.recipient = recipient;
                newWithdrawal.complete = false;
                newWithdrawal.approvalCount = 0;
    }
    
    //function to let 1 contributor approve the withdrawal
    //index param is one withdrawal of the withdrawals array
    function approveWithdrawal(uint index) public onlyContributor {
        Withdrawal storage withdrawal = withdrawals[index];
        
        //make sure whoever contributor is sending this approval has not already approved before
        require(!withdrawal.approvals[msg.sender]);
        //if first time approving make it true to say this contributor approved the request
        withdrawal.approvals[msg.sender] = true;
        withdrawal.approvalCount ++;
        
    }
    
    //transfer the value to the withdrawal if it has enough approvals
    function finalizeWithdrawal(uint index) public onlyOwner{
        Withdrawal storage withdrawal = withdrawals[index];
        require(withdrawal.approvalCount >= (contributorsCount/2)); //Make sure over 50% of all the contributors approved the withdrawal
        require(!withdrawal.complete);//Make sure withdrawal has not been made before
        
        address(uint160(withdrawal.recipient)).transfer(withdrawal.value);//tramsfering the money from the contract to the recipient
        withdrawal.complete = true;
    }
    
}