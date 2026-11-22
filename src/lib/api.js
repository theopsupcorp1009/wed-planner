export async function api(path, method = "GET", body) {
    const tokenRes = await fetch("/api/token");
    const { token } = await tokenRes.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}
