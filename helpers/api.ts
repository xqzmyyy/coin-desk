export const sendRequest = async (endpoint: string) => {
    try {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = await fetch('https://api.coindesk.com' + endpoint);
        
        if (!req.ok) {
            return {
                error: true,
                status: req.status,
                message: `HTTP error, status: ${req.status}`,
            };
        }

        const res = await req.json();
        
        return res;
    } catch (error) {
        console.error(error);
        return { error: error };
    }
};