import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { rejectCompanyService } from '../services/userService';
import { toast } from 'react-hot-toast';

export const RejectCompanyPage = () => {
    const { id } = useParams();

    const [error, setError] = useState(null);
    useEffect(() => {
        try {
            rejectCompanyService(id);
            toast.success('Empresa rechazada');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    }, [id]);

    return (
        <form className="flex flex-col items-center h-screen mt-12">
            <h1 className="text-2xl font-bold text-center mb-10">
                Empresa rechazada
            </h1>

            {error ? <p>{error}</p> : <p>Activando tu cuenta</p>}
        </form>
    );
};
