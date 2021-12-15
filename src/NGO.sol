// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract NGO {
    address[] donors;
    address[] donatees;
    address[] suspectLaundry;

    uint threshold = 10;
    uint totalFunds = 0;
    uint maxValue = 50;
    Donatee private _instance; //instance of donatee obj

    // Donate Function 
    function Donate(address donoraddr, uint amount) public payable {
        if (amount > threshold ){
           addDonors(donoraddr);
           addSuspect(donoraddr);
           totalFunds = address(this).balance + amount;
           //TODO: raise a warning after adding to the sus list
        }
        else if (amount <= threshold ) {
            addDonors(donoraddr);
            totalFunds = address(this).balance + amount;
        }
        else if (totalFunds > maxValue) {
            //TODO: implement that function to alert everyone
        }
    }

    // get all money in NGO
    function getNGOFunds() public view returns (uint) { 
        return totalFunds;
    }

    function getDonors () public view returns (address[] memory){
        return donors;
    }

    function getDonatees () public view returns (address[] memory){
        return donatees;
    }

// 0xddaAd340b0f1Ef65169Ae5E41A8b10776a75482d
    function getLaundry () public view returns (address[] memory){
        return suspectLaundry;
    }

    function addDonors(address donor) private {
        donors.push(donor);
    }

    function addDonatees(address donatee) private {
        donatees.push(donatee);
    }

    function addSuspect(address suspect) private {
        suspectLaundry.push(suspect);
    }

    function alertAll () private {

       // TODO: make this function alert everyone that this NGO might laundry place
    }
}


contract Donor {

    string private name;
    string private location;
    uint256 private amount;

    NGO private _instance;
    constructor() {
        _instance = new NGO();
    }

    function setName(string memory _name) public {
        name = _name;
    }

    function setLocation(string memory _location) public {
        location = _location;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getLocation() public view returns (string memory) {
        return location;
    }

    // thisfunc will call the parent class
    function DONATE(uint _amount) public {
        _instance.Donate(address(this), _amount);
    }

    // u might think am duplicating this function, its yes and no
    // encapsulating the data allowing the users to only view
    function getNGOFunds() public view returns (uint){
        return _instance.getNGOFunds();
    }

    function getDonorList() public view returns (address[] memory, string memory) {
        return (_instance.getDonors(), name);
        // return name;
    }

    function getSuspectList() public view returns (address[] memory) {
        return _instance.getLaundry();
    } 
}

contract Donatee {

}
