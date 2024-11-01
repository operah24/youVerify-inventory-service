import ApiError from "../../../../ApiError";
import { IObjectProp } from "../../helpers/interfaces";
import { IItem, Item } from "../../models/item";
import { getItemByName } from "../../repositories";


export const createItem = async (requestBody: IItem) => {
  const {itemName, stockQuantity} = requestBody;
  const itemExists = await getItemByName(itemName.toLowerCase());
  if (itemExists) {
    throw new ApiError("ITEM ALREADY EXISTS");
  }

  const newItem: IObjectProp = {};
  newItem["itemName"] = itemName.toLowerCase();
  newItem["stockQuantity"] = stockQuantity;
  newItem["createdAt"] = new Date(Date.now());

  const itemModel = new Item(newItem);
  await itemModel.save();
  newItem._id = itemModel._id;

  return newItem;
};
