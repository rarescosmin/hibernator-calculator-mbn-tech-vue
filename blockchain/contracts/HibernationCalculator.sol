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

    struct Map {
        string[] keys;
        mapping(string => HibernationInformation) values;
        mapping(string => uint) indexOf;
        mapping(string => bool) inserted;
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
        string uuid,
        bool deleted
    );

    event AnimalsCleared(
        bool deleted
    );

    //mapping(string => HibernationInformation) public animals;

    Map private animals;

    //string[] public animalKeysArray;

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
        HibernationInformation memory hibernationData = HibernationInformation(
            uuid,
            length,
            weight,
            result,
            min,
            avg,
            max
        );

        set(uuid, hibernationData);
        emit AnimalAdded(uuid, length, weight, result, min, avg, max);
    }

    function deleteAnimalByUUID(string memory uuid) public {
        bool isAnimalDeleted = remove(uuid);

        if (isAnimalDeleted) {
            emit AnimalDeleted(uuid, true);
        } else {
            emit AnimalDeleted(uuid, false);
        }
    }

    function clearAnimals() public {
        for (uint i = 0; i < animals.keys.length; i++) {
            deleteAnimalByUUID(animals.keys[i]);
        }
        emit AnimalsCleared(true);
    }

    function getAnimalCount() public view returns (uint) {
        return size();
    }

    function getAnimalByUUID(string memory uuid) public view returns (HibernationInformation memory) {
        return get(uuid);
    }

    function get(string memory key) private view returns (HibernationInformation memory) {
        return animals.values[key];
    }

    function getKeyAtIndex(uint index) private view returns (string memory) {
        return animals.keys[index];
    }

    function size() private view returns (uint) {
        return animals.keys.length;
    }

    function set(string memory key, HibernationInformation memory val) private {
        if (animals.inserted[key]) {
            animals.values[key] = val;
        } else {
            animals.inserted[key] = true;
            animals.values[key] = val;
            animals.indexOf[key] = animals.keys.length;
            animals.keys.push(key);
        }
    }

    function remove(string memory key) private returns (bool){
        if (!animals.inserted[key]) {
            return false;
        }

        delete animals.inserted[key];
        delete animals.values[key];

        uint index = animals.indexOf[key];
        uint lastIndex = animals.keys.length - 1;
        string memory lastKey = animals.keys[lastIndex];

        animals.indexOf[lastKey] = index;
        delete animals.indexOf[key];

        animals.keys[index] = lastKey;
        animals.keys.pop();

        return true;
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






    // function deleteAnimal(string memory uuid) public {
    //     delete animals[uuid];
    //     animalCount --;
        
    //     for (uint i = 0; i < animalKeysArray.length - 1; i++) {
    //         if (keccak256(abi.encodePacked(animalKeysArray[i])) == keccak256(abi.encodePacked(uuid))) {
    //             removeKeyFromAnimalKeysArrayByIndex(i);
    //         }
    //     }
    //     animalKeysArray.pop();

    //     emit AnimalDeleted(uuid);
    // }

    // function clearAnimals() public {
    //     require(animalKeysArray.length > 0, "Can't delete animals");
        
    //     for (uint i = 0; i < animalKeysArray.length; i++) {
    //         deleteAnimal(animalKeysArray[i]);
    //     }
    //     emit AnimalsCleared(true);
    // }

    // function getAnimalUUIDs() public view returns (string[] memory){
    //     return animalKeysArray;
    // }

    

    // function removeKeyFromAnimalKeysArrayByIndex(uint _index) private {
    //     require(_index < animalKeysArray.length, "index out of bound");

    //     for (uint i = _index; i < animalKeysArray.length - 1; i++) {
    //         animalKeysArray[i] = animalKeysArray[i + 1];
    //     }
    //     animalKeysArray.pop();
    // }
}