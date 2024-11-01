import { addStock, deductStock } from './../services/item/updateStock';
import { NextFunction, Request, Response } from "express";
import { controller, post, put, get} from "../../decorators";
import Utilities from "../helpers/utilities";
import Joi from "joi";
import * as ControllerParams from "./utils/get_controller_params";
import ItemService from "../services/item"

@controller("/inventory/")
export default class ItemController {
  @post("item")
  async createItem(req: Request, res: Response, next: NextFunction) {
    try {
      req.body = Utilities.trimCollection(req.body);

      const schema = schemas.createItem;
      Utilities.validateControllerParams(schema, req.body);
      
      const data = await ItemService.createItem(
        req.body
      );

      return Utilities.sendResponse(
        res,
        "Item Has Been Created Successfully",
        201,
        data
      );
    } catch (error) {
      next(error);
    }
  }

  @put("item/:id/addStock")
  async addStock(req: Request, res: Response, next: NextFunction) {
    try {
      req.body = Utilities.trimCollection(req.body);
      
      const data = await ItemService.addStock(
        req.params.id,
        req.body
      );
      return Utilities.sendResponse(
        res,
        "Item Stock Quantity Updated Successfully!",
        201,
        data
      );
    } catch (error) {
      next(error);
    }
  }

  @put("item/:id/deductStock")
  async deductStock(req: Request, res: Response, next: NextFunction) {
    try {
      req.body = Utilities.trimCollection(req.body);
      
      const data = await ItemService.deductStock(
        req.params.id,
        req.body
      );
      return Utilities.sendResponse(
        res,
        "Item Stock Quantity Updated Successfully!",
        201,
        data
      );
    } catch (error) {
      next(error);
    }
  }

  @get("item/:id")
  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ItemService.getItem(req.params.id );
      return Utilities.sendResponse(res, "Single Item ", 200, data)
    } catch (error) {
      next(error)
    }
  }
}

const schemas = {
    createItem: Joi.object(ControllerParams.getCreateItemParams())
};