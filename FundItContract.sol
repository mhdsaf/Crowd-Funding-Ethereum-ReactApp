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
    string public date;
    address public owner;
    uint public targetAmount;
    uint public contributorsCount;
    uint public donatedAmount;
    bool public completed;
    constructor(uint _targetAmount, string memory _title, string memory _description, string memory _date, address creator) public {
        owner = creator;
        title = _title;
        date = _date;
        description = _description;
        targetAmount = _targetAmount;
        completed = false;
    }
    function contribute() public payable {
        require(completed == false);
    }
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    function withdrawAllFunds(address payable _address) public onlyOwner{
        donatedAmount = address(this).balance;
        _address.transfer(address(this).balance);
        completed = true;
    }
    function balaceOf() public view returns(uint){
        return address(this).balance;
    }
}