module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", //this can be anyting
      port: 7545,
      network_id: "5777",
    },
  },
  compilers: {
    solc: {
      version: "0.8.10",
    },
  },
};

