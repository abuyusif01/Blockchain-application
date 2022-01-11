# Blockchain-application

There're 2 file in /src 
- Donatee.sol has some basic information on the donatees
- NGOrganization.sol has all the transaction functionalities


# How to run?
- mirror /src to remix ide.
- you just need to run NGOrganization.sol (no need Donatee.sol).


# Part 2 phase
├── build
│   └── contracts
│       ├── Donatee.json
│       └── NGOrganization.json
├── contracts
│   ├── Donatee.sol
│   └── NGOrganization.sol
├── migrations
│   └── 2_migrate_NGOrganization.js
├── README.md
├── test
│   └── NGOrganizationTest.js
└── truffle-config.js


### Pls read test/NGOrganizationTest.js for more details

# Dependencies

You must have nodejs and npm installed your system the follow the above instructions.

- `isLinux ? sudo npm install -g truffle : npm install -g truffle` 
- `npm install dotenv`
- `npm install env`
- Also get ganache from here[(https://trufflesuite.com/ganache/)]
