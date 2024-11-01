import Joi from "joi";

export const getCreateItemParams = () => {
  return {
    itemName: Joi.string().required(),
    stockQuantity: Joi.number(),
  }
}
