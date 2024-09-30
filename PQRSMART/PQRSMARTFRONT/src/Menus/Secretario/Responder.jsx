import React, { useEffect, useState } from 'react';
import '../Secretario/Responder.css'
import { UserinfoSecre } from '../../componentes/Userinfo';
import { MenuSecre } from '../../componentes/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiArrowCircleLeft } from 'react-icons/hi';

const Responder = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const datas = state ? state.data : {};
    const [form, setForm] = useState(datas);
    const token = localStorage.getItem('token')
    const [formData, setFormData] = useState({
        answer: '',
        requestState: { idRequestState: 2 }
    });


    useEffect(() => {
        if (state && state.data) {
            setForm(state.data)
        }
    }, [state]);
    const handleReset = () => {
        setFormData({
            answer: '',
        });
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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


    useEffect(() => {
        console.log(form.idRequest)
        console.log(form)
        document.title = "Responder PQRS"

    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8080/api/request/update/${form.idRequest}`,
                {
                    answer: formData.answer,
                    requestState: formData.requestState,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            console.log('Response:', response.data);
            alert('EXITOSO');
            navigate('/GestionarPQRS');
            setData(''); // resetear el estado de data
            handleReset(); // limpiar el formulario
        } catch (error) {
            console.error('Error al actualizar el estado: ', error);
        }
    };
    
    console.log(datas)
    if (!datas) {
        return(
        <div className='Responder'>
            <div className="menus">
                <MenuSecre />
            </div>
            <div className="cuerpos">
                <div className="headers">
                    <h1 className="title">RESPONDER</h1>
                    <div className="user-menu">
                        <UserinfoSecre />

                    </div>
                </div>

                <div className="form">
                    <form className="solicitud-form">
                        <h2>No hay datos Seleccionados.</h2>

                    </form>
                </div>
            </div>
        </div>
        )


    }
    return (
        <div className='Responder'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuSecre />
            </div>
            <div className="cuerpos">
                <div className="headers">
                    <h1 className="title">RESPONDER</h1>
                    <div className="user-menu">
                        <UserinfoSecre />

                    </div>
                </div>

                <div className="form">
                    <form className="solicitud-form" onSubmit={handleSubmit}>
                        <div className="input-box">
                            <label>Respueta:</label><br />
                            <textarea
                                name="answer"
                                id="answer"
                                rows="4"
                                cols="50"
                                value={formData.answer || ''}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="enviar">
                            <button type="submit">Enviar</button>
                            <br />
                            {data}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Responder;
