import mongoose from "mongoose";
import { getItemByMatch } from "../../repositories";
import ApiError from "../../../../ApiError";

const ObjectId = mongoose.Types.ObjectId;
export const getItem = async(id: string) => {
    const item = await getItemByMatch({_id: new ObjectId(id)})
    if(!item){
        throw new ApiError("No Item Found", 400, null)
    }
    return item
}