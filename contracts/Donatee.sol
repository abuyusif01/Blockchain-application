// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Donatee {

    string private name;
    string private location;
    uint256 private totalFunds = 0;
    address private addr;

    // Function to receive Ether. msg.data must be empty
    receive() external payable {
        totalFunds += msg.value;
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {
        totalFunds += msg.value;
    }

    function receiveDonation(uint256 _amount) external payable{
        totalFunds += _amount;
    }

    function withdraw(uint256 _amount) external payable {
        require(_amount <= totalFunds, "Must be <= TotalFunds");
        totalFunds -= _amount;
    }

    function setDonateeName(string memory _name) public {
        name = _name;
    }

    function setDonateeLocation(string memory _location) public {
        location = _location;
    }

    function getDonateeName() public view returns (string memory) {
        return name;
    }

    function getDonateeLocation() public view returns (string memory) {
        return location;
    }

    function setDonateeAddr(address _addr) public {
        addr = _addr;
    }

    function getDonateeAddr() public view returns(address) {
        return addr;
    }

    function getDonateeTotalFunds() public view returns(uint256 ) {
        return totalFunds;
    }
}