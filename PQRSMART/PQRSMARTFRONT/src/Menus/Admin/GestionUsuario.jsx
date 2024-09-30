import React, { useEffect, useState } from 'react';
import '../Admin/GestionUsuario.css'
import { MenuAdmin } from '../../componentes/Menu';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserinfoAmin } from '../../componentes/Userinfo';
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const GestionUsuario = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda
    const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados
    
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

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Usuario/get',{
                'Authorization': `Bearer ${token}`
            })
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    const handleCrear = () => {
        navigate('/CrearUsuario')
    }

    const handleCancel = async (id) => {
        try {
            await axios.patch(`http://localhost:8080/api/Usuario/cancel/${id}`);
            // Actualizar la tabla después de cancelar la solicitud
            fetchData(); 
        } catch (error) {
            console.error('Error al desactivar el usuario: ', error);
        }
    };

    useEffect(() => {
        document.title = "Gestionar Usuarios"
        fetchData();
    }, []);


    // Filtrar datos cuando cambie el texto de búsqueda
    useEffect(() => {
        const filtered = data.filter(item =>
            String(item.user).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.name).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.lastName).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.identificationNumber).toLowerCase().includes(filterText.toLowerCase()) ||  // Convertir a string
            String(item.role).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.stateUser.state).toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredData(filtered);
    }, [filterText, data]); // Se ejecuta cuando cambia filterText o data
    


    const columns = [
        {
            name: 'Usuario',
            selector: row => row.user
        },
        {
            name: 'Nombre',
            selector: row => row.name
        },
        {
            name: 'Apellido',
            selector: row => row.lastName
        },
        {
            name: 'Identificacion',
            selector: row => row.identificationNumber
        },
        {
            name: 'Rol',
            selector: row => row.role
        },
        {
            name: 'Estado',
            selector: row => row.stateUser.state
        },
        {
            name: 'Editar',
            cell: row => (
                <div className='accion'>
                    <div className="versoli">
                        <FaSearch />
                    </div>
                    <div className="eliminarsoli" onClick={() => handleCancel(row.id)}>
                        <MdOutlineCancel />
                    </div>
                </div>)
        },

    ]
    return (
        <div className='GestionUsuario'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
           
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
            <div className="headers">
                     <h1 className="title">GESTION USUARIO</h1>
                    <div className="user-menu">
                        <UserinfoAmin/>

                    </div>
                </div>
               
                <div className="form">
                    <form className="gestionUser-form">
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

export default GestionUsuario;
