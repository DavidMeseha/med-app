import mongoose from 'mongoose'

export interface Users extends mongoose.Document {
    name: string
    isLogin: boolean
    email: string
    password: string
    role: 'doctor' | 'user'
    notes: { date: Date, doctor: { id: string, name: string }, text: string }[]
}

const UserSchema = new mongoose.Schema<Users>({
    name: {
        type: String,
        required: true,
        maxlength: 60,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    notes: [
        {
            doctor: {
                id: String,
                name: String
            },
            date: Date,
            body: String
        }
    ],
    isLogin:Boolean
})

export default mongoose.models.User || mongoose.model<Users>('User', UserSchema)