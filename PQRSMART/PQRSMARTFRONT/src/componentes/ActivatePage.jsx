import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export const ActivatePage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState('');

    const checkLoginStatus = () => {
        const logged = localStorage.getItem('loggetPQRSMART') === 'true';
        setIsLogged(logged);
        
        if (logged) {
            const userData = JSON.parse(localStorage.getItem('userPQRSMART'));
            if (userData) {
                const { role } = userData;
                if (role === 'ADMIN') {
                    navigate('/HomePagesAdmin');
                } else if (role === 'USER') {
                    navigate('/HomePage');
                } else if (role === 'SECRE') {
                    navigate('/HomePagesSecre');
                }
            }
        }

    };

    useEffect(() => {
        checkLoginStatus();
        const verifyEmail = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/auth/verify-email', {
                    params: { token }
                });
                if (response.status === 200) {
                    alert('Correo electrónico verificado correctamente');
                    navigate('/');
                } else {
                    alert(`Error al verificar correo electrónico: ${response.data}`);
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                alert('Error al verificar correo electrónico');
            }
        };

        verifyEmail();
    }, [token]);
    if (isLogged) {
        return null; //o un spinner si quieres mostrar algo mientras se redirige
    }

    return (
        <div>
            Verificando correo electrónico...
        </div>
    );
};
