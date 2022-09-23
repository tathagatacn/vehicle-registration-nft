// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract VehicleRegistration is ERC721Enumerable {
    // Contain all NFT Info
    Registration[] public registrations;

    // Mapping with tokenId to avoid duplicate
    mapping(uint256 => bool) _registrationExist;

    // NFT Structure
    struct Registration {
        uint256 tokenId;
        uint16 stateCode;
        uint16 number;
    }

    constructor() ERC721("VehicleRegistration", "VRNNFT") {
        mint(0, 0);
    }

    function mint(uint16 _stateCode, uint16 _number) public {
        uint256 _tokenId = uint256(_stateCode) * 10000 + _number;

        require(!_registrationExist[_tokenId], "Error - Registration already exists");

        Registration memory nft = Registration(
            _tokenId,
            _stateCode,
            _number
        );
        registrations.push(nft);

        _mint(msg.sender, _tokenId);

        _registrationExist[_tokenId] = true;
    }
}
