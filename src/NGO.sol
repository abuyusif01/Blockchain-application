// SPDX-License-Identifier: GPL-3.0

import "Donatee.sol";
pragma solidity >=0.7.0 <0.9.0;

contract NGO {
    address[] private donors;
    address[] private donatees;
    address[] private suspectLaundry;
    string private donorName;
    string private donorLocation;


    uint threshold = 10;
    uint totalFunds = 0;
    uint susFunds = 0;
    uint maxValue = 50;
    Donatee private _instance; //instance of donatee obj

    constructor() {
        _instance = new Donatee();
        addDonatees(address(_instance)); // make ur life easy
    }
    // Donate Function 
    function Donate(address donoraddr, uint _amount) public payable {

        require(donoraddr != address(0x00) , "Pls enter your etherium addr");
        require(_amount >= 1, "Pls Enter an integer number");
        require(totalFunds < maxValue, "\nEveryone will be alert in the Network\nThis place isn't laundry Pls!!!");

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

    function addDonatees(address _donatee) private {
        donatees.push(_donatee);
    }

    function addSuspect(address _suspect) private {
        suspectLaundry.push(_suspect);
    }

    function alertAll() private {
        require(totalFunds <= maxValue, "Everyone will be notified, this organisation is probably a laudry place" );
    }

    function giveToDonatee(uint256 _amount) external payable {
        require(_amount <= totalFunds ,"Pls Enter funds <= totalfunds");
        _instance.receiveDonation(_amount);
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
}
