const HibernationCalculator = artifacts.require("HibernationCalculator");

contract('HibernationCalculator', accounts => {
    let contract;

    beforeEach(async () => {
        contract = await HibernationCalculator.deployed();
    });

    it('successfully deploys contract with one animal added inside with uuid = 923e1a57-4000-4cb2-8869-cb37e77a357d', async () => {
        
        const animalCount = await contract.getAnimalCount();
        assert.equal(animalCount.toNumber(), 1, "animalCount - should be exactly 1");

        const expectedAnimalData = {
            uuid: "923e1a57-4000-4cb2-8869-cb37e77a357d",
            shellLength: 12000000000000000000,
            weight: 11000000000000000000,
            result: 3,
            min: 257658000000000000000,
            avg: 303611000000000000000,
            max: 350494000000000000000
        }
        const initialAnimal = await contract.getAnimalByUUID("923e1a57-4000-4cb2-8869-cb37e77a357d");
        assert.equal(initialAnimal.uuid, expectedAnimalData.uuid, "uuid not the same"),
        assert.equal(initialAnimal.shellLength, expectedAnimalData.shellLength, "length not the same");
        assert.equal(initialAnimal.weight, expectedAnimalData.weight, "weight not the same");
        assert.equal(initialAnimal.result, expectedAnimalData.result, "result not the same");
        assert.equal(initialAnimal.min, expectedAnimalData.min, "min not the same");
        assert.equal(initialAnimal.avg, expectedAnimalData.avg, "avg not the same");
        assert.equal(initialAnimal.max, expectedAnimalData.max, "max not the same");
    });

    it('successfully adds a new animal', async () => {
        const initialAnimalCount = await contract.getAnimalCount();

        const animalDataToAdd = {
            uuid: "8cd18961-ece3-415e-8fdd-490b321a277d",
            shellLength: BigInt(11000000000000000000),
            weight: BigInt(12000000000000000000),
            result: 1,
            min: BigInt(267158000000000000000),
            avg: BigInt(203511000000000000000),
            max: BigInt(250496000000000000000)
        };

        await contract.addAnimal(
            animalDataToAdd.uuid,
            animalDataToAdd.shellLength,
            animalDataToAdd.weight,
            animalDataToAdd.result,
            animalDataToAdd.min,
            animalDataToAdd.avg,
            animalDataToAdd.max
        );

        const updatedAnimalCount = await contract.getAnimalCount();
        assert.equal(initialAnimalCount.toNumber() + 1, updatedAnimalCount.toNumber(), "animalCount did not increase by exactly 1");
        
        const addedAnimal = await contract.getAnimalByUUID(animalDataToAdd.uuid);
        assert.equal(addedAnimal.uuid, animalDataToAdd.uuid, "uuid not the same"),
        assert.equal(addedAnimal.shellLength, animalDataToAdd.shellLength, "length not the same");
        assert.equal(addedAnimal.weight, animalDataToAdd.weight, "weight not the same");
        assert.equal(addedAnimal.result, animalDataToAdd.result, "result not the same");
        assert.equal(addedAnimal.min, animalDataToAdd.min, "min not the same");
        assert.equal(addedAnimal.avg, animalDataToAdd.avg, "avg not the same");
        assert.equal(addedAnimal.max, animalDataToAdd.max, "max not the same");
    });

    it('successfully adds then deletes animals', async () => {
        const initialAnimalCount = await contract.getAnimalCount();

        const animalsToAdd = {
            firstAnimal: {
                uuid: "f355f843-d935-4e27-82f3-1d6e652f62bf",
                shellLength: BigInt(11000000000000000000),
                weight: BigInt(12000000000000000000),
                result: 1,
                min: BigInt(267158000000000000000),
                avg: BigInt(203511000000000000000),
                max: BigInt(250496000000000000000)
            },
            secondAnimal: {
                uuid: "b57f4aa3-ae65-4e6e-91c0-92a7f130a841",
                shellLength: BigInt(11000000000000000000),
                weight: BigInt(12000000000000000000),
                result: 1,
                min: BigInt(267158000000000000000),
                avg: BigInt(203511000000000000000),
                max: BigInt(250496000000000000000)
            },
            thirdAnimal: {
                uuid: "185de3b2-2aec-4046-b7ce-1c6d5c6bd6db",
                shellLength: BigInt(11000000000000000000),
                weight: BigInt(12000000000000000000),
                result: 1,
                min: BigInt(267158000000000000000),
                avg: BigInt(203511000000000000000),
                max: BigInt(250496000000000000000)
            }
        };

        await contract.addAnimal(
            animalsToAdd.firstAnimal.uuid,
            animalsToAdd.firstAnimal.shellLength,
            animalsToAdd.firstAnimal.weight,
            animalsToAdd.firstAnimal.result,
            animalsToAdd.firstAnimal.min,
            animalsToAdd.firstAnimal.avg,
            animalsToAdd.firstAnimal.max
        );

        await contract.addAnimal(
            animalsToAdd.secondAnimal.uuid,
            animalsToAdd.secondAnimal.shellLength,
            animalsToAdd.secondAnimal.weight,
            animalsToAdd.secondAnimal.result,
            animalsToAdd.secondAnimal.min,
            animalsToAdd.secondAnimal.avg,
            animalsToAdd.secondAnimal.max
        );

        await contract.addAnimal(
            animalsToAdd.thirdAnimal.uuid,
            animalsToAdd.thirdAnimal.shellLength,
            animalsToAdd.thirdAnimal.weight,
            animalsToAdd.thirdAnimal.result,
            animalsToAdd.thirdAnimal.min,
            animalsToAdd.thirdAnimal.avg,
            animalsToAdd.thirdAnimal.max
        );

        const animalCountAfterAddition = await contract.getAnimalCount();
        assert.equal(initialAnimalCount.toNumber() + 3, animalCountAfterAddition.toNumber(), "animal count did not increase by exactly 3");

        const firstDeletedAnimal = await contract.deleteAnimalByUUID(animalsToAdd.firstAnimal.uuid);
        const firstDeletedAnimalEvent = firstDeletedAnimal.logs[0].args;
        const animalCountAfterFirstDeletion = await contract.getAnimalCount();
        assert.equal(firstDeletedAnimalEvent.uuid, animalsToAdd.firstAnimal.uuid, "uuid of first deleted animal don\'t match");
        assert.equal(firstDeletedAnimalEvent.deleted, true, "first animal uuid event should be marked as true");
        assert.equal(animalCountAfterAddition.toNumber() - 1, animalCountAfterFirstDeletion.toNumber(), "animal count did not decrease by exactly 1 after first deletion");

        const secondDeletedAnimal = await contract.deleteAnimalByUUID(animalsToAdd.secondAnimal.uuid);
        const secondDeletedAnimalEvent = secondDeletedAnimal.logs[0].args;
        const animalCountAfterSecondDeletion = await contract.getAnimalCount();
        assert.equal(secondDeletedAnimalEvent.uuid, animalsToAdd.secondAnimal.uuid, "uuid of second deleted animal don\'t match");
        assert.equal(secondDeletedAnimalEvent.deleted, true, "second animal uuid event should be marked as true");
        assert.equal(animalCountAfterAddition.toNumber() - 2, animalCountAfterSecondDeletion.toNumber(), "animal count did not decrease by exactly 2 after the second deletion");

        const thirdDeletedAnimal = await contract.deleteAnimalByUUID(animalsToAdd.thirdAnimal.uuid);
        const thirdDeletedAnimalEvent = thirdDeletedAnimal.logs[0].args;
        const animalCountAfterThirdDeletion = await contract.getAnimalCount();
        assert.equal(thirdDeletedAnimalEvent.uuid, animalsToAdd.thirdAnimal.uuid, "uuid of third deleted animal don\'t match");
        assert.equal(thirdDeletedAnimalEvent.deleted, true, "third animal uuid event should be marked as true");
        assert.equal(animalCountAfterAddition.toNumber() - 3, animalCountAfterThirdDeletion.toNumber(), "animal count did not decrease by exactly 3 after the third deletion");

        const animalCountAfterAllDeletions = await contract.getAnimalCount();
        assert.equal(initialAnimalCount.toNumber(), animalCountAfterAllDeletions.toNumber(), "animal count is not the same between initial point and after all deletions");
    });

    it('tries to delete an inexisting key and expects event with deleted = false', async () => {
        const initialAnimalCount = await contract.getAnimalCount();

        const unsuccessfullyDeletedAnimal = await contract.deleteAnimalByUUID("XXXXXXXXXXXX");
        const unsuccessfullyDeletedAnimalEvent = unsuccessfullyDeletedAnimal.logs[0].args;
        const animalCountAfterDeletion = await contract.getAnimalCount();

        assert.equal(initialAnimalCount.toNumber(), animalCountAfterDeletion.toNumber());
        assert.equal(unsuccessfullyDeletedAnimalEvent.uuid, "XXXXXXXXXXXX", "uuid of deletion doesn\'t match");
        assert.equal(unsuccessfullyDeletedAnimalEvent.deleted, false, "deletion event should be false for inexisting animal");
    });

    it('successfully adds three animals and then clears them all', async () => {
        const animalsToAdd = {
            firstAnimal: {
                uuid: "f355f843-d935-4e27-82f3-1d6e652f62bf",
                shellLength: BigInt(11000000000000000000),
                weight: BigInt(12000000000000000000),
                result: 1,
                min: BigInt(267158000000000000000),
                avg: BigInt(203511000000000000000),
                max: BigInt(250496000000000000000)
            },
            secondAnimal: {
                uuid: "b57f4aa3-ae65-4e6e-91c0-92a7f130a841",
                shellLength: BigInt(11000000000000000000),
                weight: BigInt(12000000000000000000),
                result: 1,
                min: BigInt(267158000000000000000),
                avg: BigInt(203511000000000000000),
                max: BigInt(250496000000000000000)
            },
            thirdAnimal: {
                uuid: "185de3b2-2aec-4046-b7ce-1c6d5c6bd6db",
                shellLength: BigInt(11000000000000000000),
                weight: BigInt(12000000000000000000),
                result: 1,
                min: BigInt(267158000000000000000),
                avg: BigInt(203511000000000000000),
                max: BigInt(250496000000000000000)
            }
        };

        await contract.addAnimal(
            animalsToAdd.firstAnimal.uuid,
            animalsToAdd.firstAnimal.shellLength,
            animalsToAdd.firstAnimal.weight,
            animalsToAdd.firstAnimal.result,
            animalsToAdd.firstAnimal.min,
            animalsToAdd.firstAnimal.avg,
            animalsToAdd.firstAnimal.max
        );

        await contract.addAnimal(
            animalsToAdd.secondAnimal.uuid,
            animalsToAdd.secondAnimal.shellLength,
            animalsToAdd.secondAnimal.weight,
            animalsToAdd.secondAnimal.result,
            animalsToAdd.secondAnimal.min,
            animalsToAdd.secondAnimal.avg,
            animalsToAdd.secondAnimal.max
        );

        await contract.addAnimal(
            animalsToAdd.thirdAnimal.uuid,
            animalsToAdd.thirdAnimal.shellLength,
            animalsToAdd.thirdAnimal.weight,
            animalsToAdd.thirdAnimal.result,
            animalsToAdd.thirdAnimal.min,
            animalsToAdd.thirdAnimal.avg,
            animalsToAdd.thirdAnimal.max
        );

        const animalsCleared = await contract.clearAnimals();
        const animalsClearedEvent = animalsCleared.logs[0].args;
        const animalCountAfterClearence = await contract.getAnimalCount();
        assert.equal(animalCountAfterClearence.toNumber(), 0, "animals were not all cleared");
        assert.equal(animalsClearedEvent.deleted, true, "cleared animals event should be true");
    });
});