import { cartModel } from "../../database/models/cart.model.js";
import { orderModel } from "../../database/models/order.model.js";
import { productModel } from "../../database/models/product.model.js";
import { AppError } from "../utilities/AppError.js";
import mongoose from "mongoose";

const createOrderService = async (userId, shippingAddress) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await cartModel.findOne({ userId }).session(session);

    if (!cart || cart.products.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    for (let item of cart.products) {
      const product = await productModel
        .findById(item.productId)
        .session(session);

      if (!product || product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for product`, 400);
      }
    }

    const orderItems = cart.products.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      title: item.title,
      imageCover: item.imageCover,
    }));

    const totalPrice = cart.totalPriceAfterDiscount || cart.totalPrice;

    const order = await orderModel.create(
      [
        {
          userId,
          orderItems,
          totalOrderPrice: totalPrice,
          shippingAddress,
        },
      ],
      { session },
    );

    // decrease stock
    for (let item of cart.products) {
      await productModel.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { session },
      );
    }

    // 🔥 تفريغ الكارت
    cart.products = [];
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getOrderService = async (id,userId) => {
  const filter = {
    _id: id,
    isDeleted: false,
  };

  if (user.role !== "admin") {
    filter.userId = userId._id;
  }

  const order = await orderModel.findOne(filter);

  if (!order)
    throw new AppError("Order not found", 404);

  return order;
};

const updateOrderService = async (id,status) => {
    const order = await orderModel.findById(id);
    if (!order) throw new AppError("Order not found", 404);
    order.status = status;
    if (status === "paid") {
      order.paidAt = Date.now();
    }
    if (status === "delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save();
    return order;
};

const deleteOrderService = async (id) => {
    const order = await orderModel.findById(id);
        if (order.isDeleted === true) throw new AppError("Order not found", 404);
        order.isDeleted = true;
        await order.save();
        return order;
};

const cancelOrderService = async (id, userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await orderModel
      .findOne({ _id: id, userId })
      .session(session);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (order.status !== "pending") {
      throw new AppError("Only pending orders can be cancelled",400);
    }

    order.status = "cancelled";
    await order.save({ session }); 

    for (let item of order.orderItems) {
      await productModel.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: item.quantity } },
        { session }
      );
    }

    const user = await userModel
      .findById(userId)
      .session(session); 

    user.cancelCount += 1;

    if (user.cancelCount >= 3) {
      user.isBlocked = true;
    }

    await user.save({ session }); 

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
export {
   createOrderService,
   getOrderService,
   updateOrderService,
   deleteOrderService,
   cancelOrderService
   };
