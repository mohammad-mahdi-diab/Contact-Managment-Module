export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/contacts/add', '/profile', '/contacts/all-contacts'],
}