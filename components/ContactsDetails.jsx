'use client'
import { FaMapMarker } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
const ContactDetails = ({ contact }) => {
    const { data: session } = useSession()
    return ((!session && !contact.approved) ||
        (session && !session.user?.admin && !contact.approved && contact.owner.toString() !== session.user.id) ?
        <h1 className="text-center text-2xl font-bold mt-10">
            Contact not found
        </h1> :
        <main>
            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                {session &&
                    (
                        (session.user?.admin) || // admin
                        (contact.owner.toString() === session.user.id) // owner 
                    ) &&
                    (<h1 className={`${contact.approved ? ('bg-green-500') : ('bg-red-500')} text-white px-4 py-2 rounded-lg text-center text-lg`}>
                        {contact.approved ? 'Approved' : 'Not approved'}
                    </h1>)
                }
                <h1 className="text-3xl font-bold mb-4 text-center">{contact.first_name} {' '} {contact.last_name}</h1>
                <h1 className="text-2xl font-light mb-4 text-center">{contact.position}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                    <FaMapMarker className="text-orange-700 mr-2" />
                    <p className="text-orange-700">
                        {contact.location.country}, {contact.location.city}
                    </p>
                </div>
                <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2 text-center">
                    {contact.email}
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Mobile Number:</div>
                        <div className="text-2xl font-bold text-blue-500">
                            {contact.phone_numbers.mobile}
                        </div>
                    </div>

                    <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                        <div className="text-2xl font-bold text-blue-500">
                            {contact.phone_numbers.mobile}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6 text-center">Description</h3>
                <p className="text-gray-500 mb-4 text-center">
                    {contact.description}
                </p>
            </div>
        </main>
    )
}

export default ContactDetails