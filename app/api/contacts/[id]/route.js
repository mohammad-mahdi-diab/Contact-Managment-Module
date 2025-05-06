import connectDB from "@/config/database"
import Contact from "@/models/Contact";
import { getSessionUser } from "@/utils/getSessionUser";

// GET api/contacts/:id
export const GET = async (request, { params }) => {
    try {
        params = await params
        await connectDB();
        const contact = await Contact.findById(params.id);
        if (!contact) {
            return new Response("contact Not Found", { status: 404 });
        }
        return new Response(JSON.stringify(contact))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 })
    }
}


// DELETE api/contacts/:id
export const DELETE = async (request, { params }) => {
    try {
        params = await params
        const contactId = params.id;
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User Id is required', { status: 401 })
        }
        const { userId } = sessionUser;

        await connectDB();
        const contact = await Contact.findById(contactId);
        if (!contact) {
            return new Response("Contact Not Found", { status: 404 });
        }
        // verify ownership
        if (contact.owner.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 })
        }
        await contact.deleteOne();
        return new Response("Contact Deleted", { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 })
    }
}

// PUT api/contacts/:id
export const PUT = async (request, { params }) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }

        const { id } = params;
        const { userId } = sessionUser;

        const formdata = await request.formData();

        // Get contact to update
        const existingContact = await Contact.findById(id);
        if (!existingContact) {
            return new Response('Contact does not exist', { status: 404 });
        }

        // Verify ownership
        if (existingContact.owner.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 });
        }

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
        }

        // Update contact in database
        const updatedContact = await Contact.findByIdAndUpdate(id, contactData);

        return new Response(JSON.stringify(updatedContact), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Failed to add Contact', { status: 500 });
    }
};