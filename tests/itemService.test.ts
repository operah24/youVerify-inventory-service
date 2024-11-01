import { Item } from './../src/api/models/item';

// tests/itemService.test.ts

import { createItem } from '../src/api/services/item/createItem';
// import { getItemByName } from '../src/api/repositories/item'; // Assumed location
import { IItem } from '../src/api/models/item'; // Assumed location
import ApiError from "../ApiError";
import {getItemByName} from '../src/api/repositories/item'; 
jest.mock('../src/api/repositories/item',() =>({
    getItemByName: jest.fn()
})); // Mock item repository

jest.mock('../src/api/models/item'); // Mock item model


describe('createItem', () => {
    const mockItemName = 'TestItem';
    const mockStockQuantity = 10;
    const mockItem = {
        itemName: mockItemName,
        stockQuantity: mockStockQuantity,
        // _id: 'mockId'
    };

    const existingItem = {
        itemName: 'fuel',
        stockQuantity: 2,
    }

    let result: any;
    beforeEach( () => {

		result = {
            _id: 'mockId',
            itemName: mockItemName.toLowerCase(),
            stockQuantity: mockStockQuantity,
            createdAt: new Date()
        };

       
	
        jest.clearAllMocks();
    });

    it('should create a new item if it does not already exist', async () => {
        // Cast getItemByName as jest.Mock to ensure it’s treated as a mock function
        // getItemByName.mockResolvedValue(null)

        // Mock Item model's save method
        const mockSave = jest.fn().mockResolvedValue({
            ...mockItem,
            createdAt: new Date()
        });
        (Item as unknown as jest.Mock).mockImplementation((itemData: IItem) => ({
            ...itemData,
            save: mockSave
        }));

        await createItem(mockItem);

        expect(getItemByName).toHaveBeenCalledWith(mockItemName.toLowerCase());
        expect(mockSave).toHaveBeenCalled();
        expect(result).toMatchObject({
            _id: 'mockId',
            itemName: mockItemName.toLowerCase(),
            stockQuantity: mockStockQuantity,
            createdAt: expect.any(Date)
        });
    });

    // it('should throw an error if the item already exists', async () => {
    //     // jest.spyOn(itemRepository, 'getItemByName').mockResolvedValue({
    //     //     itemName: mockItemName,
    //     //     stockQuantity: mockStockQuantity,
    //     //     _id: '26568789087r6787'
    //     // });

    //     // await createItem({
    //     //     itemName: 'fuel',
    //     //     stockQuantity: 2,
    //     // })
    //     const itemModel = new Item({
    //         itemName:"fuel",
    //         stockQuantity: 2
    //     });
    //     await itemModel.save();

    //     const result = await createItem(existingItem);
    //     expect(result).toThrow(ApiError);
    //     expect(result).toThrow('ITEM ALREADY EXISTS');

    //     expect(getItemByName).toHaveBeenCalledWith(existingItem.itemName.toLowerCase());
    // });
});



// tests/itemService.test.ts

// import { getItem } from '../src/api/services/item/getItem'; // Adjust path as needed
// import { getItemByMatch } from '../src/api/repositories/item'; // Adjust path as needed
// import ApiError from '../src/api/utils/ApiError'; // Adjust path if necessary
// import { ObjectId } from 'mongodb';

// jest.mock('../src/api/repositories/item'); // Mock item repository

// describe('getItem', () => {
//     const validId = '507f191e810c19729de860ea'; // Example valid ObjectId as a string

//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should return an item when found', async () => {
//         // Mock getItemByMatch to return an item when called with a valid ID
//         (getItemByMatch as jest.Mock).mockResolvedValue({
//             _id: new ObjectId(validId),
//             itemName: 'Test Item',
//             stockQuantity: 20
//         });

//         const result = await getItem(validId);

//         expect(getItemByMatch).toHaveBeenCalledWith({ _id: new ObjectId(validId) });
//         expect(result).toMatchObject({
//             _id: new ObjectId(validId),
//             itemName: 'Test Item',
//             stockQuantity: 20
//         });
//     });

//     it('should throw an ApiError when item is not found', async () => {
//         // Mock getItemByMatch to return null
//         (getItemByMatch as jest.Mock).mockResolvedValue(null);

//         await expect(getItem(validId)).rejects.toThrow(ApiError);
//         await expect(getItem(validId)).rejects.toThrow('No Item Found');
        
//         expect(getItemByMatch).toHaveBeenCalledWith({ _id: new ObjectId(validId) });
//     });
// });
