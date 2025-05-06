const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

async function fetchContacts() {
    try {
        // Domain is not available
        if (!apiDomain) {
            return [];
        }
        const res = await fetch(`${apiDomain}/contacts`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error("Failed to get the data");
        }
        return res.json()
    } catch (error) {
        console.log(error)
        return [];
    }
};

async function fetchContact(id) {
    try {
        // Domain is not available
        if (!apiDomain) {
            return null;
        }
        const res = await fetch(`${apiDomain}/contacts/${id}`);
        if (!res.ok) {
            throw new Error("Failed to get the data");
        }
        return res.json();
    } catch (error) {
        console.log(error)
        return null;
    }
};

// fetch all contacts sorted by creation date 
async function fetchAllSortedContacts() {
    const res = await fetchContacts();
    return res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// fetch all contacts sorted by creation date and paying attention for the yet to be approved
async function fetchSortedContacts() {
    const res = await fetchContacts();
    const resFiltered = res.filter((field) => field.approved === true)
    return resFiltered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// fetch 3 random contacts and paying attention for the yet to be approved
async function fetchRandomContacts() {
    const res = await fetchContacts();
    const resFiltered = res.filter((field) => field.approved === true)
    return resFiltered.sort(() => Math.random() - Math.random()).slice(0, 3);
};


export { fetchSortedContacts, fetchRandomContacts, fetchContact, fetchAllSortedContacts };