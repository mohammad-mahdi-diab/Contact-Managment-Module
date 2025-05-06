'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import ContactsCard from '@/components/ContactsCard';
import ContactSearch from '@/components/ContactSearch';
import Spinner from '@/components/Spinner';

const SearchResultsPage = () => {
    const searchParams = useSearchParams();

    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const keyword = searchParams.get('location');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await fetch(`/api/contacts/search?location=${keyword}`);
                if (res.status === 200) {
                    const data = await res.json();
                    console.log(data)
                    setContents(data);
                } else {
                    setContents([]);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [keyword]);

    return (
        <>
            <section className='bg-blue-700 py-4'>
                <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
                    <ContactSearch />
                </div>
            </section>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <section className='px-4 py-6'>
                    <div className='container-xl lg:container m-auto px-4 py-6'>
                        <Link
                            href='/contacts'
                            className='flex items-center text-blue-500 hover:underline mb-3'
                        >
                            <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To contacts
                        </Link>
                        <h1 className='text-2xl mb-4'>Search Results</h1>
                        {contents.length === 0 ? (
                            <p>No contact found</p>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                {contents.map((contact) => (
                                    <ContactsCard key={contact._id} property={contact} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};
export default SearchResultsPage;
