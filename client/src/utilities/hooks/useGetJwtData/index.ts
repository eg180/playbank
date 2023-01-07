export default function useGetJwtData() {
    const sessionToken: string  = sessionStorage.getItem("sesh") ?? 'notfound';

    if (sessionToken === 'notfound') {
        return 'notfound'
    }
    const token: string = JSON.parse(sessionToken);
    return token;
}