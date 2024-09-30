import React, { useEffect, useState } from 'react';
import { MenuAdmin } from '../../componentes/Menu';
import '../Admin/GestionDependencia.css'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserinfoAmin } from '../../componentes/Userinfo';
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const GestionDependencia = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda
    const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/dependence/get')
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error en la data: ', error);
        }

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
        document.title = "Gestion de Dependencias"
        fetchData();
    }, []);
    const handleCrear = () => {
        navigate('/CrearDependencias')
    }

    const handleCancel = async (idDependence) => {
        try {
            await axios.put(`http://localhost:8080/api/dependence/cancel/${idDependence}`);
            // Actualizar la tabla después de cancelar la solicitud
            fetchData(); 
        } catch (error) {
            console.error('Error al eliminar la dependencia: ', error);
        }
    };

    useEffect(() => {
        const filtered = data.filter(item =>
            String(item.nameDependence).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.state.description).toLowerCase().includes(filterText.toLowerCase()) 
            
        );
        setFilteredData(filtered);
    }, [filterText, data]); // Se ejecuta cuando cambia filterText o data

    const columns = [
        {
            name: 'Nombre Dependencia',
            selector: row => row.nameDependence
        },
        {
            name: 'Estado Dependencia',
            selector: row => row.state.description
        },
        {
            name: 'Editar',
            cell: row => (
                <div className='accion'>
                    <div className="versoli">
                        <FaSearch />
                    </div>
                    <div className="eliminarsoli" onClick={() => handleCancel(row.idDependence)}>
                        <MdOutlineCancel />
                    </div>
                </div>
            )
        },

    ]
    return (
        <div className='GestionDependencia'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
            <div className="headers">
                    <h1 className="title">GESTION DE DEPENDENCIAS</h1>
                    <div className="user-menu">
                        <UserinfoAmin/>

                    </div>
                </div>
                <div className="form">
                    <form className="gestionDepe-form">
                        <div className="busqueda">
                            <input type="text" placeholder='Buscar' value={filterText}
                            onChange={(e) => setFilterText(e.target.value)} // Actualiza el estado del texto de búsqueda
                            />
                            <button className='btnCrear' onClick={handleCrear}  >Crear</button>
                        </div>

                        <DataTable
                            columns={columns}
                            data={filteredData}
                            responsive
                            pagination
                            paginationPerPage={7}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GestionDependencia;
