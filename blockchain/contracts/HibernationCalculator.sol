// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract HibernationCalculator {
    uint public animalCount = 0;

    struct HibernationInformation {
        string uuid;
        uint length;
        uint weight;
        uint result;
        uint min;
        uint avg;
        uint max;
    }

    event AnimalAdded(
        string uuid,
        uint length,
        uint weight,
        uint result,
        uint min,
        uint avg,
        uint max
    );

    event AnimalDeleted(
        string uuid
    );

    event AnimalsCleared(
        bool deleted
    );

    mapping(string => HibernationInformation) public animals;

    string[] public animalKeysArray;

    constructor() {
        initializeContract();
    }

    function addAnimal(
        string memory uuid,
        uint length,
        uint weight,
        uint result,
        uint min,
        uint avg,
        uint max
    ) public {
        animals[uuid] = HibernationInformation(uuid, length, weight, result, min, avg, max);
        animalKeysArray.push(uuid);
        animalCount ++;
        emit AnimalAdded(uuid, length, weight, result, min, avg, max);
    }

    function deleteAnimal(string memory uuid) public {
        delete animals[uuid];
        animalCount --;
        
        for (uint i = 0; i < animalKeysArray.length - 1; i++) {
            if (keccak256(abi.encodePacked(animalKeysArray[i])) == keccak256(abi.encodePacked(uuid))) {
                removeKeyFromAnimalKeysArrayByIndex(i);
            }
        }
        animalKeysArray.pop();

        emit AnimalDeleted(uuid);
    }

    function clearAnimals() public {
        for (uint i = 0; i < animalKeysArray.length; i++) {
            deleteAnimal(animalKeysArray[i]);
        }
        emit AnimalsCleared(true);
    }

    function initializeContract() private {
        addAnimal(
            "923e1a57-4000-4cb2-8869-cb37e77a357d",
            12000000000000000000,
            11000000000000000000,
            3,
            257658000000000000000,
            303611000000000000000,
            350494000000000000000
        );
    }

    function removeKeyFromAnimalKeysArrayByIndex(uint _index) private {
        require(_index < animalKeysArray.length, "index out of bound");

        for (uint i = _index; i < animalKeysArray.length - 1; i++) {
            animalKeysArray[i] = animalKeysArray[i + 1];
        }
        animalKeysArray.pop();
    }
}