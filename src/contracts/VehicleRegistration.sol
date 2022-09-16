// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract VehicleRegistration is ERC721 {
    // Contain all NFT Info
    Registration[] public registrations;

    // Mapping with tokenId to avoid duplicate
    mapping(string => bool) _registrationExist;

    // NFT Structure
    struct Registration {
        string tokenId;
        uint8 stateCode;
        uint16 number;
        string color;
        bool isPresident;
        bool isRewarded;
        address payable owner;
    }

    constructor() ERC721("VehicleRegistration", "VRNNFT") {}
}
