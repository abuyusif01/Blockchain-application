const NGOrganization = artifacts.require("NGOrganization");
require('dotenv').config()


// NGO is the actual project file

contract('NGOrganization', (accounts) => {

    address = {
        "abu": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        "farhana": "0xC711F2474e84f765A5e2680f39ac1fCF8e73FC87",
        "husna": "0xd9145CCE52D386f254917e481eB44e9943F39138"
    }

    suspectList = {
        "abu": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        "farhana": "0xC711F2474e84f765A5e2680f39ac1fCF8e73FC87",
    }

    donors = {
        "abu": "0x56a2777e796eF23399e9E1d791E1A0410a75E31b",
        "farhana": "0x9396B453Fad71816cA9f152Ae785276a1D578492",
    }
    Array.prototype.equals = function(arr2) {
        return (
          this.length === arr2.length &&
          this.every((value, index) => value === arr2[index])
        );
      };
      
    let Organization
    before(async () => {
        Organization = await NGOrganization.deployed();
    })

    // test case 1 {testing to see if we return admin as expected}.
    it('It should return admin', async () => {
        const receivedAdmin = await Organization.getUser()
        assert.equal(receivedAdmin, "admin")
    })

    // here i changed the admin to Abu and check again
    it('It should return Abu', async () => {
        await Organization.setUser("Abu", { from: accounts[0] })
        const receivedAdmin = await Organization.getUser()
        assert.equal(receivedAdmin, "Abu")
    })
    // TODO
    // Create_2_functions
    // 1 - showDonorInfo() -> return all donor info, name, location, total transactions involement and so on
    // 2 - showDonateeInfo() -> return donor name, location, and acc balance

    it('Should return null because no donation where made', async () => {
        const donors = await Organization.getDonors();
        assert.equal(donors.length, 0);
    })

    it('Should return all initial values, threshold = 10, totalFunds = 0, susFunds = 0, maxValue = 50', async () => {
        assert.equal(await Organization.getNGOFunds(), 0) //  current NGO funds we have
        assert.equal(await Organization.getSusFunds(), 0) // The suspect laundery 
        assert.equal(await Organization.getMaxValue(), 50) // the max threshold
        assert.equal(await Organization.getThreshold(), 10) // max donation for one person
    })


    it('Testing DONATE functionality', async () => {
        await Organization.DONATE(address["husna"], 5)
        assert.equal(await Organization.getNGOFunds(), 5)
    })

    it('Testing Suspect functionality', async () => {

        // so in here abu donates 15, which is above the threshold, we're expecting his address to be in the suspect list
        await Organization.DONATE(address["abu"], 15)
        await Organization.DONATE(address["farhana"], 15)
        assert.equal(true, Object.values(await Organization.getLaundry()).
        equals(Object.values(suspectList)))
    })

    it('Get the Donatees address', async () => {
        
    })

    it('Get the Donors address', async () => {
        assert.equal(true, Object.values(await Organization.getLaundry()).
        equals(Object.values(suspectList)))
    })


    // should return the array list of donatees atm {getDonatees()}

    // should return the array list of suspect {getSuspect()}

    // should return the array list of the donors{getDonors[]()}

    // should return the information of a donor all of 'em.

    // should return true {DONATE()}   NOTE: need to change the return type of DONATE function

    // should return NGO funds == this.totalFunds NOTE: totalFunds must be change to public

    // giveToDonatee() do the calculations and cross check to  make sure the transaction succeed, aka call donateShowBalance() to check the balance after transferring the money
})