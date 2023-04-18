import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    email: {type: mongoose.SchemaTypes.String, required: true},
    password: {type: mongoose.SchemaTypes.String, required: true},
    token: {type: mongoose.SchemaTypes.String, required: true}
}, {timestamps: true});

export const CollectionSchema = new mongoose.Schema({
    author: {type: mongoose.SchemaTypes.String, required: true},
    name: {type: mongoose.SchemaTypes.String, required: true},
    //Files contain file_id from FileSchema
    files: {type: mongoose.SchemaTypes.Array, required: true}
}, {timestamps: true});

export const FileSchema = new mongoose.Schema({
    author: {type: mongoose.SchemaTypes.String, required: true},
    file_id: {type: mongoose.SchemaTypes.String, required: true},
    file_name: {type: mongoose.SchemaTypes.String, required: true},
    file_ext: {type: mongoose.SchemaTypes.String, required: true},
    file_type: {type: mongoose.SchemaTypes.String, required: true},
    mime_type: {type: mongoose.SchemaTypes.String, required: true},
    served: {type: mongoose.SchemaTypes.Number, required: true}
}, {timestamps: true});

export const URLSchema = new mongoose.Schema({
    author: {type: mongoose.SchemaTypes.String},
    id: {type: mongoose.SchemaTypes.String, required: true},
    url: {type: mongoose.SchemaTypes.String, required: true},
    password: {type: mongoose.SchemaTypes.String},
    once: {type: mongoose.SchemaTypes.Boolean}
}, {timestamps: true});