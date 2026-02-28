import { orderModel } from "../../../database/models/order.model.js";
import { catchError } from "../../utilities/catchError.js";
import { getItems } from "../../factorcode/factor.js";
import { cancelOrderService, createOrderService,
   deleteOrderService, getOrderService,
    updateOrderService } from "../../services/order.services.js";

const createOrder = catchError(async (req, res, next) => {
  let order=await createOrderService(req.user._id,req.body.shippingAddress)
  res.status(201).json({ message: "success", order });
});
const getUserOrders = getItems(orderModel,'userId');

const getSingleOrder = catchError(async (req, res, next) => {
  const order=await getOrderService(req.params.id,req.user)
  res.status(200).json({ message: "success", order });

});

const updateOrder = catchError(async (req, res, next) => {
  let order=await updateOrderService(req.params.id,req.body.status)
  res.status(200).json({ message: "success", order });
});

//soft delete
const deleteOrder = catchError(async (req, res, next) => {
    let order=await deleteOrderService(req.params.id);
    res.json({ message: "success" , order });
  });

const cancelOrder = catchError(async (req, res,next) => {
  let order = await cancelOrderService(req.params.id,req.user._id)
  res.status(200).json({ message: "success",order });
});

export { 
  createOrder,
  getUserOrders,
  getSingleOrder,
  updateOrder ,
  deleteOrder,
  cancelOrder
};