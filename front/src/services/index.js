export const getAllProjectsService = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}`);
    //console.log('response getAllProjectsService: ', response);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const getSingleProjectService = async (id) => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project/${id}`
    );

    console.log('response getSingleProjectService: ', response);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

// ! Si nuestro Registro devuelve algo tenemos q retornarlo aquí
export const registerUserService = async ({ email, register_password }) => {
    //console.log('registerUserService; email, password: ', email, register_password);

    //* Requests a la url del backend (igual q postman) /register
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, register_password }),
    });
    //console.log('response registerUserService: ', response);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

export const loginUserService = async ({ email, register_password }) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, register_password }),
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data; //devuelve el token
};

export const sendProjectService = async ({ data, token }) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/`, {
        method: 'POST',
        body: data,
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


export const deleteProjectService = async ({ id, token }) => {
    const response = await fetch(
        `
    
    ${import.meta.env.VITE_BASE_URL}/project/${id}`,
        {
            method: 'DELETE',
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

export const modifyProjectService = async ({ id, token }) => {
    const response = await fetch(
        `
    ${import.meta.env.VITE_BASE_URL}/project/${id}`,
        {
            method: 'PUT',
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


// endpoint /user, Get info user for React Context 
export const getMyUserDataService = async ({token}) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
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

