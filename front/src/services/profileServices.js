export const getProfileService = async (id) => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/profile/${id}`
    );
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

export const insertProfileService = async ({ formData, token }) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/myprofile`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: token,
        },
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    console.log({ json });
    return json.data;
};
export const updateProfileService = async ({ data, token }) => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/profileupdate`,
        {
            method: 'PUT',
            body: data,
            headers: {
                Authorization: token,
            },
        }
    );
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

export const getProjectsByProfileService = async (id) => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/projects/${id}`
    );
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

export const insertRoleUsernameCompanyService = async ({ formData, token }) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/role`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: token,
        },
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};
