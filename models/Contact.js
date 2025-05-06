import { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
        },
        description: {
            type: String,
        },
        location: {
            country: {
                type: String,
            },
            city: {
                type: String,
            }
        },
        email: {
            type: String,
            unique: [true, 'Email already exists'],
            required: [true, 'Email is required'],
        },
        phone_numbers: {
            mobile: {
                type: String
            },
            landline: {
                type: String
            }
        },
        approved: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;
