'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import profileDefault from '@/assets/images/profile.png';
import Spinner from "@/components/Spinner"
import { toast } from "react-toastify";

const ProfilePage = () => {
    const { data: session } = useSession()
    const profileImage = session?.user?.image
    const profileName = session?.user?.name
    const profileEmail = session?.user?.email

    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchUserContacts = async (userId) => {
            if (!userId) {
                return
            }
            try {
                const res = await fetch(`/api/contacts/user/${userId}`)
                if (res.status === 200) {
                    const data = await res.json()
                    setContacts(data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        // Fetch user contacts when session is available
        if (session?.user?.id) {
            fetchUserContacts(session.user.id)
        }
    }, [session])

    const handleDeleteContact = async (contactId) => {
        const confirmed = window.confirm("Are you sure you want to delete this contact?")
        if (!confirmed) return;
        try {
            const res = await fetch(`/api/contacts/${contactId}`, { method: 'DELETE' })
            if (res.status === 200) {
                const updatedContacts = contacts.filter((contact) => contact._id !== contactId)
                setContacts(updatedContacts)
                toast.success('Contacts deleted')
            } else {
                toast.error('Failed to delete poperty')
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to delete poperty')
        }
    }

    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mx-20 mt-10">
                            <div className="mb-4">
                                <Image
                                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                    src={profileImage || profileDefault}
                                    width={200}
                                    height={200}
                                    alt="User"
                                />
                            </div>
                            <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span>{profileName}</h2>
                            <h2 className="text-2xl"><span className="font-bold block">Email: </span>{profileEmail}</h2>
                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Your Contacts</h2>
                            {!loading && contacts.length === 0 && (
                                <p>You have an empty list of contacts</p>
                            )}
                            {loading ? (<Spinner loading={loading} />) : (
                                contacts.map((contact) => (
                                    <div key={contact._id} className="mb-10">
                                        <div className="mt-2">
                                            <Link href={`/contacts/${contact._id}`}>
                                                <p className="text-lg font-semibold">
                                                    {contact.first_name} {' '} {contact.last_name}
                                                </p>
                                            </Link>
                                            <p className="text-gray-600">
                                                Address: {contact.location.country} {contact.location.city}
                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <Link href={`/contacts/${contact._id}/edit`}
                                                className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteContact(contact._id)}
                                                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                                type="button">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage