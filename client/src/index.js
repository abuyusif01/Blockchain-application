const displayNGOtotalFunds = async (contract, web3) => {
    let funds = await contract.methods.getNGOFunds().call();
    let susFunds = await contract.methods.getSusFunds().call();
    $('#totalFunds').html(`Total Funds: <b style="font-size: 30px;">${web3.utils.fromWei(funds, 'ether')}</b>eth`);
    $('#totalsusFunds').html(`Total SusFunds: <b style="font-size: 30px;">${web3.utils.fromWei(susFunds, 'ether')}</b>eth`);
}

const giveToDonatee = async (contract, accounts, web3) => {
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
        await contract.methods.giveToDonatee(donatee_addr).send({ from: accounts[0], value: web3.utils.toWei(amount, 'ether') })
        displayNGOtotalFunds(contract, web3);
    });
}

const setDonorInfo = async (contract, accounts, web3) => {

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
        await contract.methods.DONATE(contract._address, name, location).send({ from: accounts[0], value: web3.utils.toWei(amount, 'ether') })
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
    
    setDonateeInfo(contract, accounts);
    giveToDonatee(contract, accounts, web3);
    displayNGOtotalFunds(contract, web3);
    setDonorInfo(contract, accounts, web3);
    getDonatees(contract);
    getLaundry(contract);
    getDonors(contract);
}

Organization();