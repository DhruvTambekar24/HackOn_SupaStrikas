const API_URL = "http://localhost:8000";

export const uploadPdf = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/upload/`, {
        method: "POST",
        body: formData,
    });

    return response.json();
};
