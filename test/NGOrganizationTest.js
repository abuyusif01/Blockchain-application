const NGOrganization = artifacts.require("NGOrganization");

// NGO is the actual project file

contract('NGOrganization', (accounts) => {
    let Organization // the project object
    before(async () => {
        Organization = await NGOrganization.deployed();
    })

    it('It should return admin', async () => {
        const receivedAdmin = await Organization.getUser()
        assert.equal(receivedAdmin, "admin")
    })

    it('It should return Abu', async () => {
        await Organization.setUser("Abu", { from: accounts[0] })
        const receivedAdmin = await Organization.getUser()
        assert.equal(receivedAdmin, "Abu")
    });
})