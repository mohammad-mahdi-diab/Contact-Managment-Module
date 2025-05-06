'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchContact } from '@/utils/requests';

const ContactEditForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [fields, setFields] = useState({
        first_name: '',
        last_name: '',
        description: '',
        position: '',
        location: {
            country: '',
            city: '',
        },
        email: '',
        phone_numbers: {
            mobile: '',
            landline: '',
        },
    })

    useEffect(() => {
        // Fetch contact data for form
        const fetchContactData = async () => {
            try {
                const contacttData = await fetchContact(id);
                setFields(contacttData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchContactData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Check for nested properties
        if (name.includes('.')) {
            const [outerKey, innerKey] = name.split('.');

            setFields((prevFields) => ({
                ...prevFields,
                [outerKey]: {
                    ...prevFields[outerKey],
                    [innerKey]: value,
                },
            }));
        } else {
            // Not nested
            setFields((prevFields) => ({
                ...prevFields,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);

            const res = await fetch(`/api/contacts/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (res.status === 200) {
                router.push(`/contacts/${id}`);
            } else if (res.status === 401 || res.status === 403) {
                toast.error('Permission denied');
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (!loading && (
        <form onSubmit={handleSubmit}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
                Edit Contact
            </h2>

            <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                    First Name
                </label>
                <input
                    type='text'
                    id='first_name'
                    name='first_name'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='First Name'
                    required
                    value={fields.first_name}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Last Name
                </label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Last Name"
                    required
                    value={fields.last_name}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Position
                </label>
                <input
                    type="text"
                    id="position"
                    name="position"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Position"
                    required
                    value={fields.position}
                    onChange={handleChange}
                />
            </div>

            <div className='mb-4'>
                <label
                    htmlFor='description'
                    className='block text-gray-700 font-bold mb-2'
                >
                    Description
                </label>
                <textarea
                    id='description'
                    name='description'
                    className='border rounded w-full py-2 px-3'
                    rows='4'
                    placeholder='Add an optional description for the contact'
                    value={fields.description}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                <input
                    type="text"
                    id="country"
                    name="location.country"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Country"
                    required
                    value={fields.location.country}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="city"
                    name="location.city"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="City"
                    required
                    value={fields.location.city}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Email address"
                    required
                    value={fields.email}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="mobile"
                    className="block text-gray-700 font-bold mb-2">
                    Mobile
                </label>
                <input
                    type="tel"
                    id="mobile"
                    name="phone_numbers.mobile"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Phone"
                    value={fields.phone_numbers.mobile}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="landline"
                    className="block text-gray-700 font-bold mb-2">
                    Landline
                </label>
                <input
                    type="tel"
                    id="landline"
                    name="phone_numbers.landline"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Phone"
                    value={fields.phone_numbers.landline}
                    onChange={handleChange}
                />
            </div>

            <div>
                <button
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                    type='submit'>
                    Update Contact
                </button>
            </div>
        </form>
    )
    );
};
export default ContactEditForm;
