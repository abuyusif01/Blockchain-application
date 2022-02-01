const displayNGOtotalFunds = async (contract) => {
    let funds = await contract.methods.getNGOFunds().call();
    let susfunds = await contract.methods.getSusFunds().call();
    $('#totalFunds').html(`Total Funds: <b style="font-size: 30px;">${funds}</b>eth`);
    $('#totalsusFunds').html(`Total SusFunds: <b style="font-size: 30px;">${susfunds}</b>eth`);
}

const giveToDonatee = async (contract, accounts) => {
    let amount;
    let donatee_addr;
    $('#amount').on('change', (e) => {
        amount = e.target.value;
    });
    $('#donateeWalletAddr').on('change', (e) => {
        donatee_addr = e.target.value;
    });
    $("#givetodonateeform").on("submit", async (e) => {
        e.preventDefault();
        amount = parseInt(amount);
        await contract.methods.giveToDonatee(donatee_addr).send({ from: accounts[0], value: amount })
        displayNGOtotalFunds(contract);
    });
}

const setDonorInfo = async (contract, accounts) => {

    let name;
    let location;
    let amount;

    $('#donorName').on('change', (e) => {
        name = e.target.value;
    });

    $('#donorLocation').on('change', (e) => {
        location = e.target.value;
    });

    $('#amount').on('change', (e) => {
        amount = e.target.value;
    });

    $("#donatenowform").on("submit", async (e) => {
        e.preventDefault();
        amount = parseInt(amount);
        await contract.methods.setDonorName(name).send({ from: accounts[0] });
        await contract.methods.setDonorLocation(location).send({ from: accounts[0] })
        await contract.methods.DONATE(contract._address).send({ from: accounts[0], value: amount })
        alert("Thanks for ur donation :)");
    });
}

const setDonateeInfo = async (contract, accounts) => {
    let name;
    let location;
    let donateeWalletAddr;

    $('#donateeName').on('change', (e) => {
        name = e.target.value;
    });

    $('#donateeLocation').on('change', (e) => {
        location = e.target.value;
    });

    $('#donateeWalletAddr').on('change', (e) => {
        donateeWalletAddr = e.target.value;
    });

    $("#setdonateeinfoform").on("submit", async (e) => {
        e.preventDefault();
        await contract.methods.addDonatees(donateeWalletAddr).send({ from: accounts[0] });
        await contract.methods.setDonateeInfo(donateeWalletAddr, name, location).send({ from: accounts[0] });
        alert("thanks for registering. You will recieve a donation when its available");
    })

}

const getDonors = async (contract) => {
    let value;
    let j = 0;
    var out = "";
    value = await contract.methods.getDonors().call();
    let i = value.length - 1;
    (value.length - 1 > 5) ? counter = 4 : counter = value.length;
    while (j < counter) { //print only 4 addr, 
        out += value[i];

        out += "<br>";
        j++, i--;
    }
    $('#donoraddr').html(out);

}

const getLaundry = async (contract) => {
    let value;
    let j = 0;
    var out = "";
    value = await contract.methods.getLaundry().call();
    let i = value.length - 1;
    (value.length - 1 > 5) ? counter = 4 : counter = value.length;
    while (j < counter) { //print only 4 addr, 
        out += value[i];
        out += "<br>";
        j++, i--;
    }
    $('#susList').html(out);
}


const getDonatees = async (contract) => {
    let value;
    let j = 0;
    var out = "";
    value = await contract.methods.getDonatees().call();
    let i = value.length - 1;
    (value.length - 1 > 5) ? counter = 4 : counter = value.length;
    while (j < counter) { //print only 4 addr, 
        out += value[i];
        out += "<br>";
        j++, i--;
    }
    $('#donateeaddr').html(out);
}


async function Organization() {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContract(web3);

    displayNGOtotalFunds(contract);
    giveToDonatee(contract, accounts);
    setDonorInfo(contract, accounts);
    setDonateeInfo(contract, accounts);
    getLaundry(contract);
    getDonors(contract);
    getDonatees(contract);
}

Organization();