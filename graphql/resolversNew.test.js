
const {Manufacturer} =require("../models");
const resolversNew = require("./resolversNew");
jest.mock("../models");


describe("query manufacturerList", () => {
    
    test("should return a list of manufacturers", async() => {
        let manufacturers = [{name: "Apple"}];
        Manufacturer.findAll.mockResolvedValue(manufacturers);
        let manufacturers = resolversNew.Query.manufacturerList();

        expect(manufacturers).toBe([]);
    })
});

// describe("createManufacturer", () => {

    // test('create a manufacturer', async () => {

    //     let manufacturer ={
    //         name: "testName",
    //         location: "testLocation"
    //     }

    //     Manufacturer.findOne.mockResolvedValue(undefined);

    //     const newManufacturer = await resolversNew.Mutation.createManufacturer(
    //         null, 
    //         manufacturer
    //     );


    //     expect(newManufacturer).resolversNew.toEqual({something});
    // })
// })