export async function postJSON(url, data) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    console.log("Wysyłam POST do:", url);

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await res.json();
        } else {
            if (!res.ok) {
                throw new Error(`Błąd serwera: ${res.status}`);
            }
            return { success: true };
        }
    } catch (error) {
        console.error("API Error:", error);
        return { error: error.message };
    }
}

export async function getJSON(url) {
    const token = localStorage.getItem('token');
    const headers = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
        method: 'GET',
        headers: headers
    });
    return await res.json();
}