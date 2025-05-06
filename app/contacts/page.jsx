import React from 'react'
import ContactsCard from '@/components/ContactsCard'
import ContactSearch from '@/components/ContactSearch'
import { fetchSortedContacts } from '@/utils/requests'

const Contacts = async () => {
    const contacts = await fetchSortedContacts();
    return (
        <>
            <section className='bg-blue-700 py-4'>
                <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
                    <ContactSearch />
                </div>
            </section>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    {contacts.length === 0 ? (
                        <p>No contacts found</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {contacts.map((contact) => (
                                <ContactsCard key={contact._id} property={contact} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Contacts