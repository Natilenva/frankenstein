export const forgotPassword = async (email) => {
    const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/forgot-password`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        }
    );

    const json = await res.json();

    if (json.status === 'error') {
        throw new Error(json.message);
    }

    return json.data;
};

export const ResetPassword = async (id, token, password, password2) => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}/reset-password/${id}/${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    password2,
                }),
            }
        );

        const json = await res.json();

        if (json.status === 'error') {
            throw new Error(json.message);
        }
        return json.data;
    } catch (err) {
        console.error(err);
    }
};

export const validateRegisterService = async (registrationCode) => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/validate/${registrationCode}`
    );
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};
export const validateCompanyService = async (id) => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/validate/${id}`
    );
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};
export const rejectCompanyService = async (id) => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/reject/${id}`,
        {
            method: 'DELETE',
        }
    );
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};
