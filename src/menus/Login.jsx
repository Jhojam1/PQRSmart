import React, { useEffect, useState } from 'react';
import './Login.css';
import Popup from '../components/Popup.jsx'; // Ruta correcta para Popup

function Login() {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    // Cargar el archivo Gradient.js
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/Gradient.js'; // Ruta directa al archivo en public
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Inicializar el gradiente una vez que el script haya cargado
            const gradient = new Gradient();
            gradient.initGradient('#gradient-canvas');
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []); // Solo se ejecuta una vez al montar el componente

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            usuario,
            contraseña
        };

        try {
            const response = await fetch('http://localhost:8080/api/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                if (errorMessage === 'Usuario no encontrado') {
                    setError('Usuario no encontrado');
                } else if (errorMessage === 'Contraseña incorrecta') {
                    setError('Contraseña incorrecta');
                } else {
                    setError('Error en el servidor');
                }
                setShowPopup(true); // Mostrar popup
                return;
            }

            const result = await response.json();
            console.log(result);

            setUsuario('');
            setContraseña('');
            setError('');
            setShowPopup(false); // Ocultar popup
        } catch (error) {
            console.error('Error:', error);
            setError('Error en el servidor');
            setShowPopup(true); // Mostrar popup
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="login-container">
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="login-box">
                <div className="logo-section">
                    <h1>PQRSmart</h1>
                    <div className="vertical-line"></div> {/* Línea vertical */}
                </div>
                <div className="form-section">
                    <div className="title">
                        <h1>Iniciar sesión</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="user-box">
                            <input
                                type="text"
                                required
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                            <label>Usuario</label>
                        </div>
                        <div className="user-box">
                            <input
                                type="password"
                                required
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                            <label>Contraseña</label>
                        </div>
                        <div className="btn-container">
                            <button type="submit" className="btn fifth">Iniciar sesión</button>
                        </div>
                    </form>
                </div>
                {showPopup && <Popup message={error} onClose={closePopup} />}
            </div>
        </div>
    );
}

export default Login;

