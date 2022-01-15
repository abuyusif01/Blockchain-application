// SPDX-License-Identifier: GPL-3.0

import "./Donatee.sol";
pragma solidity >=0.7.0 <0.9.0;

contract NGOrganization{

    // all local variables 
    address[] private donors;
    address[] private donatees;
    address private owner;
    address[] private suspectLaundry;
    string private donorName;
    string private donorLocation;
    string private user;
    uint private threshold = 10;
    uint private totalFunds = 0;
    uint private susFunds = 0;
    uint private maxValue = 50;
    Donatee public _instance; //instance of donatee obj
    Donatee private _instance1; //instance of donatee obj1 for truffle testing

    constructor(string memory _user) {
        owner = msg.sender;
        user = _user;
        _instance = new Donatee();
        // _instance1 = new Donatee();
        addDonatees(address(_instance)); // make ur life easy
        // addDonatees(address(_instance1));
    }
    // Donate Function 
    function DONATE(address donoraddr, uint _amount) public payable {

        require(donoraddr != address(0x00) , "Pls enter your etherium addr");
        require(_amount >= 1, "Pls Enter an integer number");
        require(alertAll(), "\nEveryone will be alert in the Network\nThis place isn't laundry Pls!!!");

        if(_amount > threshold  ){
           addSuspect(donoraddr);
           susFunds += _amount;
        }
        if(_amount <= threshold) {
            addDonors(donoraddr);
            totalFunds += _amount;  
        }
    }

    // get all money in NGO
    function getNGOFunds() public view returns (uint) { 
        return totalFunds;
    }


    function getSusFunds() public view returns (uint) { 
        return susFunds;
    }

    function getThreshold() public view returns (uint) { 
        return threshold;
    }

    function getMaxValue() public view returns (uint) { 
        return maxValue;
    }


    function getDonors() public view returns (address[] memory){
        return donors;
    }

    function getDonatees() public view returns (address[] memory){
        return donatees;
    }
    
    function getLaundry() public view returns (address[] memory){
        return suspectLaundry;
    }

    function addDonors(address _donor) private {
        donors.push(_donor);
    }

    function getUser() public view returns (string memory) {
        return user;
    }

    function setUser(string memory _user) public 
    {
        require(msg.sender == owner, "Not the owner");
        user = _user;
    }

    function addDonatees(address _donatee) private {
        donatees.push(_donatee);
    }

    function addSuspect(address _suspect) private {
        suspectLaundry.push(_suspect);
    }

    function alertAll() private view returns (bool){
        if (totalFunds < maxValue) {
            return true;
        }
        return false;
    }

    function giveToDonatee(uint256 _amount) external payable {
        require(_amount <= totalFunds ,"Pls Enter funds <= totalfunds");
        _instance.receiveDonation(_amount);

        // uncomment this line if u're using metamask (injected Web3), 
        // because this will duduct the money from ur wallet
        // payable (msg.sender).transfer(_amount);
        totalFunds -= _amount;
    }

    function withdrawDonatee(uint256 _amount) public payable {
        _instance.withdraw(_amount);
    }
    
    function donateeShowBalance() public view returns (uint256) {
        return _instance.showBalance();
    }

    function setDonorName(string memory _name) public {
        donorName = _name;
    }

    function setDonorLocation(string memory _location) public {
        donorLocation = _location;
    }

    function getDonorName() public view returns (string memory) {
        return donorName;
    }

    function getDonorLocation() public view returns (string memory) {
        return donorLocation;
    }
    
    function setDonateeInfo(address _addr, string memory _name, string memory _location) public {    
        _instance.setDonateeAddr(_addr);
        _instance.setDonateeName(_name);
        _instance.setDonateeLocation(_location);
    }

    function getDonateeInfo() public view returns (address, string memory, string memory, uint256 ) {
        return (_instance.getDonateeAddr(), _instance.getDonateeName(), _instance.getDonateeLocation(), _instance.getDonateeTotalFunds());
    }
}