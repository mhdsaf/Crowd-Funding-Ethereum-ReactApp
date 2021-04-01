// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;
contract CrowdfundingCampaignFactory{
    CrowdfundingCampaign[] public deployedCampaigns;
    
    function createCampaign(uint targetAmount, string memory title, string memory description, string memory date) public {
        CrowdfundingCampaign newCampaign = new CrowdfundingCampaign(targetAmount, title, description, date, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns (CrowdfundingCampaign[] memory){
        return deployedCampaigns;
    }
}
contract CrowdfundingCampaign{
    string public title;
    string public description;
    string public date; // expiry date of the campaign
    address public owner; // address of the campaign owner
    uint public targetAmount; // target amount of this campaign
    uint public transactionCount; // how many transactions were made to this campaign
    uint public donatedAmount; // total donated amount
    bool public completed; // checks whether or not the project is done
    bool public withdrawn;
    mapping(address => uint) contributors; // maps contributor address to how much they donated
    constructor(uint _targetAmount, string memory _title, string memory _description, string memory _date, address creator) public {
        owner = creator;
        title = _title;
        date = _date;
        description = _description;
        targetAmount = _targetAmount;
        completed = false;
        withdrawn = false;
    }
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    modifier onlyContributor(){
        require(contributors[msg.sender]>0);
        _;
    }
    function contribute(uint _amount) public payable { // transfer money from contributor to the campaign
        require(completed == false);
        contributors[msg.sender]= _amount*1000000000000000000;
        transactionCount++;
        //check if we reached the targetAmount. if yes, we set completed to true
        if(address(this).balance >= targetAmount){
            completed = true;
        }
    }
    function withdrawAllFunds(address payable _address) public onlyOwner{ // transfer all the funds to project owner
        require(withdrawn == false);
        donatedAmount = address(this).balance;
        _address.transfer(address(this).balance);
        withdrawn = true;
    }
    function balaceOf() public view returns(uint){ // returns the total balance (amount donated) of this campaign
        return address(this).balance;
    }
    function contributorFund() public view onlyContributor returns(uint){ // returns how much a contributor donated to this campaign
        return contributors[msg.sender];
    }
    function refund(address payable _address) public payable onlyContributor{ // transfer the funds to contributors if project fails
        _address.transfer(contributorFund());
    }
    function isContributor(address _address) public view returns(bool){ // checks if a given address is a contributor
        if(contributors[_address]>0){
            return true;
        }else{
            return false;
        }
    }
}