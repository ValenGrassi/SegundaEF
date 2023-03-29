import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const usersCollection = 'users'

const usersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String
})

usersSchema.plugin(mongoosePaginate)
const usersModel = model(usersCollection, usersSchema)

export default usersModel