export const sendRequest = async (endpoint: string, options?: RequestInit) => {
    try {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        };

        const req = await fetch('https://api.coindesk.com' + endpoint, requestOptions);

        if (!req.ok) {
            return {
                error: true,
                status: req.status,
                message: `error ${req.status}`,
            };
        }

        const res = await req.json();
        return res;
    } catch (error) {
        console.error(error);
        return { error: error };
    }
};
