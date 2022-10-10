// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./MOTToken.sol";

contract VehicleRegistration is ERC721Enumerable {
    // Contain all NFT Info
    Registration[] public registrations;

    // Mapping with tokenId to avoid duplicate
    mapping(uint256 => bool) _registrationExist;

    // Mapping with tokenId to check if rewarded
    uint256[] _pendingReward;
    mapping(uint256 => uint16) _reward;

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
        require(_stateCode <= 20, "Error - State code must be between 00 to 20");
        
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

        queuePendingReward(_tokenId, _stateCode, _number);
    }

    function queuePendingReward(uint256 _tokenId, uint16 _stateCode, uint16 _number) internal {
        if (_stateCode != 0)
        {
            uint16 digitSum = 0;
            do
            {
                digitSum += _number % 10;
                _number = _number / 10;
            } while(_number > 0);
            if (digitSum % _stateCode == 0) {
                _pendingReward.push(_tokenId);
                _reward[_tokenId] = _stateCode;
            }
        }
    }

    function rewardDistribution(address addressMOT) public {
        require(msg.sender == ownerOf(0), "Only the contarct owner can distribute rewards");
        MOTToken motContract = MOTToken(addressMOT);
        for (uint i = 0; i < _pendingReward.length; i++) {
            motContract.transferFrom(
                ownerOf(0),
                ownerOf(_pendingReward[i]),
                _reward[_pendingReward[i]]
            );
        }
        delete _pendingReward;
    }

    function calculateAllowence() public view returns(uint256) {
        uint256 totalAllowence = 0;
        for (uint i = 0; i < _pendingReward.length; i++) {
            totalAllowence += _reward[_pendingReward[i]];
        }
        return totalAllowence;
    }
}
