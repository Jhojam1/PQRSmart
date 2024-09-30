import React, { useEffect } from 'react';
import '../Admin/Dashboard.css'
import { MenuAdmin } from '../../componentes/Menu';
import { UserinfoAmin } from '../../componentes/Userinfo';


const Dashboard = () => {
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
        <div className='Dashboard'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
                <div className="headers">
                    <h1 className="title">DASHBOARD</h1>
                    <div className="user-menu">
                        <UserinfoAmin/>

                    </div>
                </div>

                <div className="form">
                    <div className="formdash">
                        <div class="totalprs">
                            <h1 className="">Total PQRS</h1>
                        </div>
                        <div class="totalpqrsdepe">
                            <h1 className="">Total PQRS por Dependencia</h1>
                        </div>
                        <div class="totalpqrsmes">
                            <h1 className="">PQRS Por Mes</h1>
                        </div>
                        <div class="totalpqrsdepemes">
                            <h1 className="">PQRS Por Dependencia al Mes</h1>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
