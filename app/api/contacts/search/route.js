import connectDB from "@/config/database";
import Contact from "@/models/Contact";

// GET /api/contacts/search
export const GET = async (request) => {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location')

        const locationPattern = new RegExp(location, 'i'); // i -> insensitive
        // Match location patterns against database fields
        let query = {
            $or: [
                { first_name: locationPattern },
                { last_name: locationPattern },
                { position: locationPattern },
                { email: locationPattern },
                { description: locationPattern },
                { 'location.country': locationPattern },
                { 'location.city': locationPattern },
                { 'phone_numbers.mobile': locationPattern },
                { 'phone_numbers.landline': locationPattern },
            ]
        }
        console.log(location)
        console.log(query)
        const contacts = await Contact.find(query);

        return new Response(JSON.stringify(contacts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong', { status: 500 })
    }
}