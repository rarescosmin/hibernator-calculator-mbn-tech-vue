const HibernationCalculator = artifacts.require("HibernationCalculator");

contract('HibernationCalculator', accounts => {
    let contract;

    beforeEach(async () => {
        contract = await HibernationCalculator.deployed();
    });

    it('deploys successfully with 1 element in the animals mapping', async () => {
        const animalCount = await contract.animalCount();
        assert.equal(animalCount.toNumber(), 1);

        //to-do add more checks on fields
    });

    it('successfully adds animal', async () => {
        const initialAnimalCount = await contract.animalCount();

        const result = await contract.addAnimal(
            "3dfef05b-0b66-450c-a0c6-d3994866f6d5",
            BigInt(12000000000000000000),
            BigInt(11000000000000000000),
            3,
            BigInt(257658000000000000000),
            BigInt(303611000000000000000),
            BigInt(350494000000000000000)
        );
        
        assert.equal(result.logs[0].args.uuid, "3dfef05b-0b66-450c-a0c6-d3994866f6d5");
        assert.equal(BigInt(result.logs[0].args.min), BigInt(257658000000000000000));
        //to-do add more checks on fields
        
        const currentAnimalCount = await contract.animalCount();
        assert.equal(currentAnimalCount.toNumber(), initialAnimalCount.toNumber() + 1);
    });

    it('successfully deletes an animal', async () => {
        const initialAnimalCount = await contract.animalCount();
        const result = await contract.deleteAnimal("3dfef05b-0b66-450c-a0c6-d3994866f6d5");

        assert.equal(result.logs[0].args.uuid, "3dfef05b-0b66-450c-a0c6-d3994866f6d5");

        const currentAnimalCount = await contract.animalCount();
        assert.equal(currentAnimalCount.toNumber(), initialAnimalCount.toNumber() - 1); 
    });

    it('successfully deletes all animals', async () => {
        await contract.clearAnimals();

        const currentAnimalCount = await contract.animalCount();
        assert.equal(currentAnimalCount.toNumber(), 0);
    });
});