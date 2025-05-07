import GoogleProvider from "next-auth/providers/google"
import connectDB from "@/config/database"
import User from "@/models/User"
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        // Invoked on successsful signIn
        async signIn({ profile }) {
            // 1. Connect to the database
            await connectDB();
            // 2. Check if user exist
            const userExist = await User.findOne({ email: profile.email })
            // 3. if not, then add user to database
            if (!userExist) {
                // Truncate username if too long
                const username = profile.name.slice(0, 20);
                await User.create({
                    email: profile.email,
                    username,
                })
            }
            // 4. Return true to allow sign in
            return true
        },
        // Modifies the session object
        async session({ session }) {
            // 1. Get the user form the database
            const user = await User.findOne({ email: session.user.email })
            // 2. Assign the user id to the session
            session.user.id = user._id.toString();
            // 3. check if admin
            // if (user.email === ADMIN_EMAIL) {
            //     session.user.admin = true
            // }
            session.user.admin = true
            // 3. Return session
            return session;
        },
    }
}