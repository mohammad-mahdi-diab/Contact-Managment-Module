import Link from 'next/link';
import ContactsCard from './ContactsCard';
import { fetchRandomContacts } from '@/utils/requests';

const HomePage = async () => {
    const contacts = await fetchRandomContacts();
    return (
        <>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
                        Some Contacts
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {contacts.length === 0 ? (
                            <p>No Contacts Found</p>
                        ) : contacts.map((contact) => (
                            <ContactsCard key={contact._id} property={contact} />
                        ))}
                    </div>
                </div>
            </section>
            <section className="m-auto max-w-lg my-10 px-6">
                <Link
                    href="/contacts"
                    className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
                    View All Contacts
                </Link>
            </section>
        </>
    )
}

export default HomePage