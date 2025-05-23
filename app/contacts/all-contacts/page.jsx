'use client'
import ContactSearch from '@/components/ContactSearch';
import { toast } from 'react-toastify';
import Link from 'next/link'
import { fetchAllSortedContacts } from '@/utils/requests';
import { FaMapMarker } from 'react-icons/fa'
import { useEffect, useState } from "react"
import Spinner from "@/components/Spinner";

const AllContactspage = () => {

    const [contactState, setContactState] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchContactsData = async () => {
            try {
                const contacts = await fetchAllSortedContacts();
                setContactState(contacts);
            } catch (error) {
                console.error('Error fetching contacts', error);
            } finally {
                setLoading(false)
            }
        }
        if (contactState === null) {
            fetchContactsData();
        }
    }, [contactState])


    const handleApprovementOfContact = async (contactId) => {
        try {
            const res = await fetch(`/api/contacts/${contactId}/admin`, {
                method: 'PUT',
            });
            if (res.status === 200) {
                setLoading(true)
                setContactState(null);
                toast.success('Contact updated');
            } else if (res.status === 401 || res.status === 403) {
                toast.error('Permission denied');
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (loading ? (<Spinner loading={loading} />) :
        <>
            <section className='bg-blue-700 py-4'>
                <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
                    <ContactSearch />
                </div>
            </section>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    {contactState.length === 0 ? (
                        <p>No Contacts Found</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {contactState.map((contact) => (
                                <div key={contact._id} className="rounded-xl shadow-md relative">
                                    <h3 className="top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-red-500 font-bold text-center">
                                        {contact.position}
                                    </h3>
                                    <div className="border border-gray-100 mb-5"></div>
                                    <div className="p-4">
                                        <div className="text-left md:text-center lg:text-left mb-2">
                                            <div className="text-gray-600">{contact.email}</div>
                                            <h3 className="text-xl font-bold">{contact.first_name} {' '} {contact.last_name}</h3>
                                        </div>
                                        <div className='text-gray-500'>
                                            <span>
                                                Mobile Number:
                                                <h2 className="text-lg font-bold inline">
                                                    {' '}{contact.phone_numbers.mobile}
                                                </h2>
                                                <br />
                                            </span>
                                            <span>
                                                Landline Number:
                                                <h2 className="text-lg font-bold inline">
                                                    {' '}{contact.phone_numbers.landline}
                                                </h2>
                                            </span>
                                        </div>

                                        <div className="border border-gray-100 mb-5"></div>

                                        <div className="flex flex-col lg:flex-row justify-between mb-4">
                                            <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                                                <FaMapMarker className="text-orange-700 mt-1" />
                                                <span className="text-orange-700"> {contact.location.city} {contact.location.country} </span>
                                            </div>
                                            <Link
                                                href={`/contacts/${contact._id}`}
                                                className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                                            >
                                                Details
                                            </Link>
                                            <button
                                                onClick={() => { handleApprovementOfContact(contact._id) }}
                                                className={`${contact.approved ? ('bg-green-500 hover:bg-green-600') : ('bg-red-500 hover:bg-red-600')} h-[36px] text-white px-4 py-2 rounded-lg text-center text-sm`}>
                                                {contact.approved ? 'Approved' : 'Unapproved'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}


export default AllContactspage