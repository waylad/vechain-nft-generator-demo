import Connex from "@vechain/connex";

import { CONST, ShipToken } from "../const/const";

let connex: Connex;
const address = "0x6940F7Cf59FBbBE0aA4FEec3aa2A19dAf12aC23c";
const DELEGATE_URL = "https://sponsor-testnet.vechain.energy/by/90";

export const connectWallet = async () => {
  try {
    connex = new Connex({
      node: "https://testnet.veblocks.net/",
      network: "test",
    });
  } catch (e: any) {
    // window.location.reload()
  }
};

const tokenOfOwnerByIndex: (
  address: string,
  index: number
) => Promise<number> = async (address: string, index: number) => {
  return new Promise((resolve) => {
    //  "function tokenOfOwnerByIndex(uint256) view returns (uint256)",
    const tokenOfOwnerByIndexAbi = {
      constant: false,
      inputs: [
        { name: "_address", type: "address" },
        { name: "_indexId", type: "uint256" },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [{ name: "_tokenId", type: "uint256" }],
      payable: false,
      stateMutability: "payable",
      type: "function",
    };

    const tokenOfOwnerByIndexMethod = connex.thor
      .account(CONST.SPACESHIP_CONTRACT)
      .method(tokenOfOwnerByIndexAbi);

    tokenOfOwnerByIndexMethod
      .call(address, index)
      .then((tokenOfOwnerByIndexOutput) => {
        resolve(tokenOfOwnerByIndexOutput.decoded._tokenId);
      });
  });
};

const _tokenToShipCode: (tokenId: number) => Promise<string> = async (
  tokenId: number
) => {
  return new Promise((resolve) => {
    //  "function _tokenToShipCode(uint256) view returns (string)",
    const _tokenToShipCodeAbi = {
      constant: false,
      inputs: [{ name: "_tokenId", type: "uint256" }],
      name: "_tokenToShipCode",
      outputs: [{ name: "shipCode", type: "string" }],
      payable: false,
      stateMutability: "payable",
      type: "function",
    };

    const _tokenToShipCodeMethod = connex.thor
      .account(CONST.SPACESHIP_CONTRACT)
      .method(_tokenToShipCodeAbi);

    _tokenToShipCodeMethod.call(tokenId).then((_tokenToShipCodeOutput) => {
      resolve(_tokenToShipCodeOutput.decoded.shipCode);
    });
  });
};

export const getShips = async () => {
  try {
    const shipId1 = await tokenOfOwnerByIndex(address, 1);
    const shipId2 = await tokenOfOwnerByIndex(address, 2);
    const shipId3 = await tokenOfOwnerByIndex(address, 3);
    const shipId4 = await tokenOfOwnerByIndex(address, 4);

    const shipCode1 = await _tokenToShipCode(shipId1);
    const shipCode2 = await _tokenToShipCode(shipId2);
    const shipCode3 = await _tokenToShipCode(shipId3);
    const shipCode4 = await _tokenToShipCode(shipId4);

    CONST.USER_SHIPS = [
      {
        tokenId: shipId1,
        shipCode: shipCode1,
      },
      {
        tokenId: shipId2,
        shipCode: shipCode2,
      },
      {
        tokenId: shipId3,
        shipCode: shipCode3,
      },
      {
        tokenId: shipId4,
        shipCode: shipCode4,
      },
    ];
    console.log(CONST.USER_SHIPS);
  } catch (e: any) {
    // window.location.reload()
  }
};

export const mintShip = async () => {
  //"function mintShip() returns (uint256)"
  const mintShipAbi: any = {
    constant: false,
    inputs: [{ name: "_address", type: "address" }],
    name: "mintShip",
    outputs: [{ name: "_tokenId", type: "uint256" }],
    payable: true,
    stateMutability: "payable",
    type: "function",
  };

  const contract = connex.thor.account(CONST.SPACESHIP_CONTRACT);
  const clauses = [contract.method(mintShipAbi).asClause(address)];
  const { txid } = await connex.vendor
    .sign("tx", clauses)
    .delegate(DELEGATE_URL)
    .comment("Mint new ship")
    .request();

  alert(txid);
};

export const upgradeShip = async (ship: ShipToken) => {
  //"function upgradeShip(uint256,string)"
  const upgradeShipAbi: any = {
    constant: false,
    inputs: [
      { name: "_tokenId", type: "uint256" },
      { name: "_shipCode", type: "string" },
    ],
    name: "upgradeShip",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  };

  const contract = connex.thor.account(CONST.SPACESHIP_CONTRACT);
  const clauses = [
    contract.method(upgradeShipAbi).asClause(ship.tokenId, ship.shipCode),
  ];
  const { txid } = await connex.vendor
    .sign("tx", clauses)
    .delegate(DELEGATE_URL)
    .comment("Upgrade ship")
    .request();

  alert(txid);
};

export const getAlphaBalance = async () => {
  // TODO
};

export const mintAlphas = async () => {
  // TODO
};

export const burnAlphas = async () => {
  // TODO
};
