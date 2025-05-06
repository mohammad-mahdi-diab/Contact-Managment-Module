'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

const ContactSearch = () => {
    const [location, setLocation] = useState('')
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault();

        if (location === '') {
            router.push('/contacts')
        } else {
            const query = `?location=${location}`;
            router.push(`/contacts/results${query}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center">
            <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
                <label htmlFor="location" className="sr-only">Location</label>
                <input
                    type="text"
                    id="location"
                    placeholder="Enter Keywords or Location (Country,City,etc"
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} />
            </div>
            <button
                type="submit"
                className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
                Search
            </button>
        </form>
    )
}

export default ContactSearch