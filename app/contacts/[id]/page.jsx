'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fetchContact } from "@/utils/requests"
import ContactsDetails from "@/components/ContactsDetails"
import { FaArrowLeft, } from 'react-icons/fa'
import Spinner from "@/components/Spinner"

const ContactPage = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchContactData = async () => {
      if (!id) return;
      try {
        const contact = await fetchContact(id)
        setContact(contact);
      } catch (error) {
        console.error('Error fetching contact', error);
      } finally {
        setLoading(false)
      }
    }
    if (contact === null) {
      fetchContactData();
    }
  }, [id, contact])

  if (!contact && !loading) {
    return <h1 className="text-center text-2xl font-bold mt-10">
      Contact not found
    </h1>
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && contact &&
        (<>
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/contacts"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Contacts
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 w-full gap-6">
                <ContactsDetails contact={contact} />
              </div>
            </div>
          </section>
        </>
        )
      }
    </>
  )
}

export default ContactPage
