import connectDB from "@/config/database"
import Contact from "@/models/Contact";
import { getSessionUser } from "@/utils/getSessionUser";

// GET api/contacts
export const GET = async (request) => {
    try {
        await connectDB();
        const contacts = await Contact.find({});
        return new Response(JSON.stringify(contacts), { status: 200, })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 })
    }
}

// POST api/contacts
export const POST = async (request) => {
    try {

        await connectDB();
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response("User ID is required", { status: 401 })
        }
        const { userId } = sessionUser

        const formdata = await request.formData();

        // Create contactData object for database
        const contactData = {
            first_name: formdata.get('first_name'),
            last_name: formdata.get('last_name'),
            position: formdata.get('position'),
            description: formdata.get('description'),
            location: {
                country: formdata.get('location.country'),
                city: formdata.get('location.city'),
            },
            email: formdata.get('email'),
            phone_numbers: {
                mobile: formdata.get('phone_numbers.mobile'),
                landline: formdata.get('phone_numbers.landline'),
            },
            owner: userId,
            approved: false,
        }
        const newContact = new Contact(contactData);
        console.log(newContact)
        await newContact.save();
        return Response.redirect(`${process.env.NEXTAUTH_URL}/contacts/${newContact._id}`)
        // return new Response(JSON.stringify({ message: 'Success' }), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Failed to add contact' }), { status: 500 })
    }
}