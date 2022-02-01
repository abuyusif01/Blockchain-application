
import './Donatee.sol';

contract NGOrganization{

    // all local variables 
    address[] private donors;
    address[] private donatees;
    address private owner;
    address[] private suspectLaundry;
    string private donorName;
    string private donorLocation;
    string private user;
    uint private threshold = 10 ether;
    uint private totalFunds = 0 ether;
    uint private susFunds = 0 ether;
    uint private maxValue = 50 ether;
    Donatee private _instance; //instance of donatee obj

    receive() external payable {}
    fallback() external payable {}

    constructor(string memory _user) {
        owner = msg.sender;
        user = _user;
        _instance = new Donatee();
        addDonatees(address(_instance)); // make ur life easy
        // addDonatees(address(_instance1));
    }
    // Fallback function is called when msg.data is not empty
   
    // Donate Function 
    function DONATE(address payable _to, string memory _name, string memory _location) public payable {

        require(msg.sender != address(0x00) , "Pls enter your etherium addr");
        require(msg.value >= 1 ether, "Pls Enter an integer number");
        require(alertAll(), "\nEveryone will be alert in the Network\nThis place isn't laundry Pls!!!");
        
        if(msg.value > threshold  ){
           addSuspect(msg.sender);
           susFunds += msg.value;
        }
        if(msg.value <= threshold) {
            addDonors(msg.sender);
            totalFunds += msg.value;
            setDonorName(_name);
            setDonorLocation(_location);
        }
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
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

    function giveToDonatee(address payable _to) external payable {
        require(msg.value <= totalFunds ,"Pls Enter funds <= totalfunds");
        _instance.receiveDonation(msg.value);

        // uncomment this line if u're using metamask (injected Web3), 
        // because this will duduct the money from ur wallet
        // payable (msg.sender).transfer(_amount);
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        totalFunds -= msg.value;
    }

    function withdrawDonatee(uint256 _amount) public payable {
        _instance.withdraw(_amount);
    }
    
    function donateeShowBalance() public view returns (uint256) {
        return _instance.getDonateeTotalFunds();
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
        addDonatees(_addr);
    }

    function getDonateeInfo() public view returns (address, string memory, string memory, uint256 ) {
        return (_instance.getDonateeAddr(), _instance.getDonateeName(), _instance.getDonateeLocation(), _instance.getDonateeTotalFunds());
    }
}