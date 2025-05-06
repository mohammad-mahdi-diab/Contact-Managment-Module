import connectDB from "@/config/database"
import Contact from "@/models/Contact";

// GET api/contacts/user/:userId
export const GET = async (request, { params }) => {
    try {
        params = await params
        await connectDB();
        const userId = params.userId
        if (!userId) {
            return new Response("User Id is required", { status: 400 })
        }
        const contacts = await Contact.find({ owner: userId });
        return new Response(JSON.stringify(contacts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 })
    }
}