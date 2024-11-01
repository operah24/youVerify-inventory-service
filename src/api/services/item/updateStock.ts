import mongoose from "mongoose";
import { IItem } from "../../models/item";
import ApiError from "../../../../ApiError";
import { getItemByMatch, updateItem } from "../../repositories";
import { addToQueue } from "../../helpers/utilities/add_to_queue";

const ObjectId = mongoose.Types.ObjectId;
export const addStock = async (id: string, body: IItem) => {
    let updatedItem;
    let item = await getItemByMatch({_id: new ObjectId(id)});
   
    if(!item){
        throw new ApiError("No Item Found", 400, null)
    }
    if(body.stockQuantity){
        const currentStockQuantity = item.stockQuantity ;
        const newStockQuantity = currentStockQuantity as number + body.stockQuantity;

        item.stockQuantity = newStockQuantity;
       
    }
    updatedItem = await updateItem(id, item);
   

    const queueData = {
        itemName: updatedItem.itemName,
        quantity: body.stockQuantity,
        updatedDate: updatedItem.updatedAt,
        eventType: 'add stock'
    }
    await addToQueue('stock_update', queueData);
    return updatedItem;
}




export const deductStock = async (id: string, body: IItem) => {
    let updatedItem;
    let item = await getItemByMatch({_id: new ObjectId(id)});
   
    if(!item){
        throw new ApiError("No Item Found", 400, null)
    }
    if(body.stockQuantity){
        const currentStockQuantity = item.stockQuantity ;
        const newStockQuantity = currentStockQuantity as number - body.stockQuantity;

        item.stockQuantity = newStockQuantity;
       
    }
    updatedItem = await updateItem(id, item);
   

    const queueData = {
        itemName: updatedItem.itemName,
        quantity: body.stockQuantity,
        updatedDate: updatedItem.updatedAt,
        eventType: 'deduct stock'
    }
    await addToQueue('stock_update', queueData);
    return updatedItem;
}