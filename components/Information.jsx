import React from 'react'
import ContactSearch from './ContactSearch'
const Information = () => {
    return (
        // <!-- Hero -->
        <section className="bg-purple-700 py-20 mb-4">
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                        Find your contacts easily
                    </h1>
                    <p className="my-4 text-xl text-white">
                        Choose your best suited contact
                    </p>
                </div>
                <ContactSearch />
            </div>
        </section>
    )
}

export default Information