import Link from 'next/link'
import { FaMapMarker } from 'react-icons/fa'

const ContactsCard = ({ property }) => {
    const contact = property
    return (
        <div className="rounded-xl shadow-md relative">
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
                        className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ContactsCard