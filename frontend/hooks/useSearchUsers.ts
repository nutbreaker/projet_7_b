export default function useSearchUsers() {
    const userFetcher = async (query: string) => {
        const response = await fetch(`/api?query=${query}`);
        return await response.json();
    };

    return userFetcher;
}