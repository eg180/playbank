export default function useGetJwtData() {
    const sessionToken: string  = sessionStorage.getItem("sesh") ?? 'notfound';
    const token: string = JSON.parse(sessionToken);
    return token;
}