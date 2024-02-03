import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    username: { type: String, required: true},
    productname: { type: String, required: true},
    quantity: {type: Number, default: 0},
    inTotal: { type: Number},
    details: { type: String},
});

export const OrderModel = mongoose.model('Order', OrderSchema);

export const getAllOrders = () => OrderModel.find();
export const getUserOrders = (username: string) => OrderModel.find({username});

export const getOrderById = (id: string) => OrderModel.findById({_id: id});
export const createOrder = (values: Record<string,any>) => new OrderModel(values).save().then((order)=>order.toObject()).catch(err=>console.log(err));
export const deleteOrderById = (id: string) => OrderModel.findByIdAndDelete({_id: id});
export const updateOrderById = (id: string, values: Record<string, any>) => OrderModel.findByIdAndUpdate({_id: id}, values);


