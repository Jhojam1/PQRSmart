import React, { useEffect } from 'react';
import './HomePage.css';
import { Menu, MenuAdmin, MenuSecre } from '../Menu.jsx';
import { UserinfoAmin, UserinfoSecre, UserinfoUser } from '../Userinfo.jsx';

export const HomePage = () => {
    const name = localStorage.getItem('users');
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
    return (
        <div className="HomePage">
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <Menu />
            </div>
            <div className="cuerpos">
                <div className="headers">
                    <title className='titulo'>Bienvenido {name}</title>
                    <div className="user-menu">
                        <UserinfoUser />

                    </div>
                </div>
                <div className="mision">
                    <p className='p1'>Mision: </p>
                    <p className='p2'>Brindar soluciones efectivas a través de una atención ágil, transparente y empática, gestionando cada petición, queja reclamo y sugerencia con el compromiso de mejorar continuamente la experiencia de nuestros usuarios.</p>
                </div>
            </div>
        </div>

    );
};

export const HomePageAdmin = () => {
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
    const name = localStorage.getItem('users');
    return (
        <div className="HomePage">
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
                <div className="headers">
                    <title className='titulo'>Bienvenido {name}</title>
                    <div className="user-menu">
                        <UserinfoAmin />

                    </div>
                </div>

                <div className="mision">
                    <p className='p1'>Mision: </p>
                    <p className='p2'>Brindar soluciones efectivas a través de una atención ágil, transparente y empática, gestionando cada petición, queja reclamo y sugerencia con el compromiso de mejorar continuamente la experiencia de nuestros usuarios.</p>
                </div>

            </div>
        </div>

    );
};


export const HomePageSecre = () => {
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
    const name = localStorage.getItem('users');
    return (
        <div className="HomePage">
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuSecre />
            </div>
            <div className="cuerpos">
                <div className="headers">
                    <title className='titulo'>Bienvenido {name}</title>
                    <div className="user-menu">
                        <UserinfoSecre />

                    </div>
                </div>

                <div className="mision">
                    <p className='p1'>Mision: </p>
                    <p className='p2'>Brindar soluciones efectivas a través de una atención ágil, transparente y empática, gestionando cada petición, queja reclamo y sugerencia con el compromiso de mejorar continuamente la experiencia de nuestros usuarios.</p>
                </div>

            </div>
        </div>

    );
};