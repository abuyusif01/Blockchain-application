pragma solidity >=0.7.0 <0.9.0;

contract Donatee {

    string private name;
    string private location;
    uint256 private totalFunds = 0;

    function receiveDonation(uint _amount) external payable{
        totalFunds += _amount;
    }

    function withdraw(uint _amount) external payable {
        require(_amount <= totalFunds, "Must be <= TotalFunds");
        totalFunds -= _amount;
    }

    function showBalance() public view returns (uint) {
        return totalFunds;
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
}
