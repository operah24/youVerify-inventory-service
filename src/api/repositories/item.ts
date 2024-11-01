import { IItem, Item } from "../models/item";

export const getItemByName = async (itemName: string) => {
    return Item.findOne<IItem>({itemName: itemName}).exec();
}

export const getItemByMatch = async (match: any) => {
    return Item.findOne<IItem>(match).exec();
}

export const updateItem = async (id: string, data: IItem) => {
    return Item.findOneAndUpdate({ _id: id }, { $set: data }, { new: true, upsert: true });
}