import connectDB from "@/config/database"
import Contact from "@/models/Contact";
import { getSessionUser } from "@/utils/getSessionUser";

// DELETE api/contacts/:id
// export const DELETE = async (request, { params }) => {
//     try {
//         params = await params
//         const contactId = params.id;
//         const sessionUser = await getSessionUser();
//         if (!sessionUser || !sessionUser.userId) {
//             return new Response('User Id is required', { status: 401 })
//         }
//         const { userId } = sessionUser;

//         await connectDB();
//         const contact = await Contact.findById(contactId);
//         if (!contact) {
//             return new Response("Contact Not Found", { status: 404 });
//         }
//         // verify ownership
//         if (contact.owner.toString() !== userId) {
//             return new Response('Unauthorized', { status: 401 })
//         }
//         await contact.deleteOne();
//         return new Response("Contact Deleted", { status: 200 })
//     } catch (error) {
//         console.log(error)
//         return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 })
//     }
// }

// PUT api/contacts/:id/admin
export const PUT = async (request, { params }) => {
    try {
        params = await params
        await connectDB();

        const sessionUser = await getSessionUser();
        const { id } = params;

        // verify user is admin
        if (!sessionUser || !sessionUser.userId || !sessionUser.user.admin) {
            return new Response('User ID is required', { status: 401 });
        }

        // Get contact to update
        const existingContact = await Contact.findById(id);
        if (!existingContact) {
            return new Response('Contact does not exist', { status: 404 });
        }

        // Create contactData object for database
        const contactData = {
            first_name: existingContact.first_name,
            last_name: existingContact.last_name,
            position: existingContact.position,
            description: existingContact.description,
            location: {
                country: existingContact.location.country,
                city: existingContact.location.city,
            },
            email: existingContact.email,
            approved: !existingContact.approved,
            phone_numbers: {
                mobile: existingContact.phone_numbers.mobile,
                landline: existingContact.phone_numbers.landline,
            },
            owner: existingContact.owner,
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