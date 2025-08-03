export const updateEmailMeta = async (id: string, updates: { type: string; subjectLine: string, previewText: string }) => {
    const response = await fetch(`http://localhost:8000/emails/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("API update failed");
    return response.json();
};