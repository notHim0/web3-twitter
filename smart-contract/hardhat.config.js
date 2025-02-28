require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/nJ6ApLAMwFVy3NnLj0_VsxoMZwXRHIdk",
      accounts: [
        "8070fa21590a32313a7f2d93606403607f55dc53a8b7085f95ed1d9f29bd6327",
      ],
    },
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
