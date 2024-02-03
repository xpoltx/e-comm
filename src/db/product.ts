import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    quantity: {type: Number, default: 0},
    color: { type: String},
    description: { type: String},
});

export const ProductModel = mongoose.model('Product', ProductSchema);

export const getAllProducts = () => ProductModel.find();
export const getProductByName = (productname: string) => ProductModel.findOne({name: productname});

export const getProductById = (id: string) => ProductModel.findOne({_id: id});
export const createProduct = (values: Record<string,any>) => new ProductModel(values).save().then((product) => product.toObject()).catch(err=>console.log(err));
export const deleteProductById = (id: string) => ProductModel.findOneAndDelete({_id: id});
export const updateProductById = (id: string, values: Record<string,any>) => ProductModel.findOneAndUpdate({_id:id},values);


// export const UserModel = mongoose.model('User', UserSchema);

// export const getUsers = () => UserModel.find();
// export const getUserByEmail = (email: string) => UserModel.findOne({email});
// export const getuserBySessionToken = (sessionToken: string) => UserModel.findOne({
//     'authentication.sessionToken': sessionToken,
// });

// export const getUserById = (id: string) => UserModel.findById(id);
// export const createUser = ( values: Record<string,any>) => new UserModel(values).save().then((user)=> user.toObject()).catch(err => console.log(err));
// export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
// export const updateUserById = (id: string,values: Record<string,any>) => UserModel.findOneAndUpdate({_id: id},values);
