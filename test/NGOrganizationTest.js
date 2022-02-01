const NGOrganization = artifacts.require("NGOrganization");

contract('NGOrganization', (accounts) => {

    let Organization;
    before(async () => {
        Organization = await NGOrganization.deployed();
    })


    address = {
        "abu": accounts[0],
        "farhana": accounts[1],
        "husna": accounts[2]
    }

    suspectList = {
        "abu": accounts[3],
        "farhana": accounts[4],
    }

    donors = {
        "abu": accounts[5],
        "farhana": accounts[6],
        "husna": accounts[7]
    }
    donatees = [
        Abubakar = {
            "addr": address["abu"],
            "name": "Abubakar",
            "location": "Nigeria"
        },
        Farhana = {
            "addr": address["farhana"],
            "name": "Farhana",
            "location": "Malaysia"
        },
        Husna = {
            "addr": address["husna"],
            "name": "husna",
            "location": "Singapore"
        }
    ]

    Array.prototype.equals = function (arr2) {
        return (
            this.length === arr2.length &&
            this.every((value, index) => value === arr2[index])
        );
    };

    function toArray(oldArray) { // js is weird
        var newArray = [];
        for (var i = 0; i < 3; i++) {
            newArray[i] = oldArray[i];
        }
        return newArray;
    }

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


    it('Testing the setDonateeInfo and getDonateeInfo', async () => {
        await Organization.setDonateeInfo(donatees[0].addr, donatees[0].name, donatees[0].location);
        var local_donatee_info;
        await Organization.getDonateeInfo.call().then(function (remote_donatee_info) {
            local_donatee_info = toArray(remote_donatee_info);
        });
        assert.equal(true, local_donatee_info.equals(Object.values(donatees[0])));
    })

    it('Should return null because no donation where made', async () => {
        const donors = await Organization.getDonors();
        assert.equal(donors.length, 0);
    })

    it('Should return all initial values, threshold = 10, totalFunds = 0, susFunds = 0, maxValue = 50', async () => {
        assert.equal(await Organization.getNGOFunds(), 0) //  current NGO funds we have
        assert.equal(await Organization.getSusFunds(), 0) // The suspect laundery 
        assert.equal(await Organization.getMaxValue(), 50) // the max threshold
        assert.equal(await Organization.getThreshold.call(), 10) // max donation for one person
    })


    it('Testing DONATE functionality', async () => {
        await Organization.DONATE(Organization.address, ({ from: donors["abu"], value: 10 }))
        assert.equal(await Organization.getNGOFunds(), 10)
    })

    it('Testing Suspect functionality', async () => {
        await Organization.DONATE(Organization.address, ({ from: suspectList["abu"], value: 15 }))
        await Organization.DONATE(Organization.address, ({ from: suspectList["farhana"], value: 15 }))
        assert.equal(true, Object.values(await Organization.getLaundry()).equals(Object.values(suspectList)))
    })

    it('Should return abu because he donated 5eth earlier', async () => {
        const _donors = await Organization.getDonors();
        assert.equal(_donors, donors["abu"]);
    })

    it('Giving 3eth to Donatee', async () => {
        await Organization.giveToDonatee(donatees[0].addr, ({ from: accounts[0], value: 3 }))
        assert.equal(3, await Organization.donateeShowBalance());
    })

    it('Withdrawing 2eth from Donatee account', async () => {
        await Organization.withdrawDonatee(2);
        assert.equal(1, await Organization.donateeShowBalance());
    })
})
