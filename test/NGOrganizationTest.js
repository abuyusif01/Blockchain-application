const NGOrganization = artifacts.require("NGOrganization");
require('dotenv').config()


// NGO is the actual project file

contract('NGOrganization', (accounts) => {
    //initializing the org object
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
        assert.equal(receivedAdmin, process.env.USERNAME)
    })
    // TODO
    // Create_2_functions
    // 1 - showDonorInfo() -> return all donor info, name, location, total transactions involement and so on
    // 2 - showDonateeInfo() -> return donor name, location, and acc balance

    // Should return empty, because no donate more than 10eth {getSuspect()}

    // should return the array list of donatees atm {getDonatees()}

    // should return the array list of suspect {getSuspect()}

    // should return the array list of the donors{getDonors[]()}

    // should return the information of a donor all of 'em.

    // should return true {DONATE()}   NOTE: need to change the return type of DONATE function

    // should return NGO funds == this.totalFunds NOTE: totalFunds must be change to public

    // giveToDonatee() do the calculations and cross check to  make sure the transaction succeed, aka call donateShowBalance() to check the balance after transferring the money
})