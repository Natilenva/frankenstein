export const getAllProjectsService = async () => {
    
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}`);
    
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}