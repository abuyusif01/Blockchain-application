const NGOrganization = artifacts.require("NGOrganization");

contract('NGOrganization', (accounts) => {

    let sub = 1000000000000000000;
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
        "husna": "0xd9145CCE52D386f254917e481eB44e9943F39138"
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


    it('Testing the setDonateeInfo and getDonateeInfo', async () => {
        await Organization.setDonateeInfo(donatees[0].addr, donatees[0].name, donatees[0].location);
        var local_donatee_info;
        await Organization.getDonateeInfo.call().then(function (remote_donatee_info) {
            local_donatee_info = toArray(remote_donatee_info);
        });
        // assert.equal(true, Object.values(await Organization.getLaundry()).equals(Object.values(suspectList)))
        assert.equal(true, local_donatee_info.equals(Object.values(donatees[0])));
    })

    it('Should return null because no donation where made', async () => {
        const donors = await Organization.getDonors();
        assert.equal(donors.length, 0);
    })

    it('Should return all initial values, threshold = 10, totalFunds = 0, susFunds = 0, maxValue = 50', async () => {
        // var maxValue = sub * 50;
        // var threshold = sub * 10;
        assert.equal(await Organization.getNGOFunds(), 0) //  current NGO funds we have
        assert.equal(await Organization.getSusFunds(), 0) // The suspect laundery 
        assert.equal(await Organization.getMaxValue(), 50) // the max threshold
        assert.equal(await Organization.getThreshold.call(), 10) // max donation for one person
    })


    it('Testing DONATE functionality', async () => {
        // await Organization.DONATE(address["husna"])
        // await Organization.DONATE(accounts[1]).send({ from: accounts[0], value: 10 })
        
        // await Organization.DONATE(accounts[1], {from: accounts[0], value: 1});                                                         
        // assert.equal(await Organization.getNGOFunds(), 1)
        // await contract.methods.DONATE("0x6514b160d63EF892E638fDfF67209f562a929aCe").send({ from: accounts[0], value: input })
        await Organization.methods.DONATE(accounts[2]).send({ from: accounts[0], value: 10});
        let x = await Organization.getNGOFunds();
        console.log(x);
    })

    // it('Testing Suspect functionality', async () => {
    //     // so in here abu  and farhan donates 15, which is above the threshold,
    //     // we're expecting their address to be in the suspect list
    //     await Organization.DONATE(address["abu"], 15)
    //     await Organization.DONATE(address["farhana"], 15)
    //     assert.equal(true, Object.values(await Organization.getLaundry()).equals(Object.values(suspectList)))
    // })

    // it('Should return Husna because she donated 5eth earlier', async () => {
    //     const _donors = await Organization.getDonors();
    //     assert.equal(_donors, donors["husna"]);
    // })

    // it('Giving 3eth to Donatee', async () => {
    //     await Organization.giveToDonatee(3);
    //     assert.equal(3, await Organization.donateeShowBalance());
    // })

    // it('Withdrawing 2eth from Donatee account', async () => {
    //     await Organization.withdrawDonatee(2);
    //     assert.equal(1, await Organization.donateeShowBalance());
    // })
})