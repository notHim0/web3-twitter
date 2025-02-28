// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProfileImageNfts is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    struct RenderToken {
        uint256 id;
        string uri;
        string space;
    }

    constructor() ERC721("ProfileImageNfts", "PIN") {}

    function getAllTokens() public view returns (RenderToken[] memory) {
        uint256 latestId = _tokenIds.current();
        uint256 count = 0;

        for (uint256 i = 0; i < latestId; i++) {
            if (_exists(i)) {
                count++;
            }
        }

        RenderToken[] memory res = new RenderToken[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < latestId; i++) {
            if (_exists(i)) {
                res[index] = RenderToken(i, tokenURI(i), " ");
                index++;
            }
        }

        return res;
    }

    function mint(address recipient, string memory _uri) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newId = _tokenIds.current();
        _mint(recipient, newId);
        _setTokenURI(newId, _uri);
        return newId;
    }
}
