import { getItem } from '../src/api/services/item/getItem';
import { getItemByMatch } from '../src/api/repositories/item';
import { ObjectId } from 'mongodb';

jest.mock('../src/api/repositories/item');

describe('getItem', () => {
    const validId = '6720f9980b9c17cf8a97a74c';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return an item when found', async () => {
        (getItemByMatch as jest.Mock).mockResolvedValue({
            _id: new ObjectId(validId),
            itemName: 'Test Item',
            stockQuantity: 20
        });

        const result = await getItem(validId);

        expect(getItemByMatch).toHaveBeenCalledWith({ _id: new ObjectId(validId) });
        expect(result).toMatchObject({
            _id: new ObjectId(validId),
            itemName: 'Test Item',
            stockQuantity: 20
        });
    });
    
});
