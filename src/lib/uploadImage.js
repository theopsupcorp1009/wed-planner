export async function uploadImage(image) {
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
        { method: "POST", body: formData }
    );
    const result = await res.json();

    if (!result.success) {
        throw new Error("Image upload failed");
    }

    return result.data.url;
}
