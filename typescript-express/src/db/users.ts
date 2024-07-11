import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

// ? All UserModel CRUD Opearation Logics
// * Get User Logic
export const getUsers = () => UserModel.find();
// * Get User By Email Logic 
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
// * Get User By Session Token Logic 
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
// * Get User By Id Logic
export const getUserById = (id: string) => UserModel.findById({ id });

// ! User Creation
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
// ! User Deletion
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
// ! User Updation
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
