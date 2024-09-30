import React, { useEffect, useState } from 'react';
import '../Admin/GestionCategoria.css'
import axios from 'axios';
import { MenuAdmin } from '../../componentes/Menu';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { UserinfoAmin } from '../../componentes/Userinfo';
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import Popup from '../../componentes/Popup'


const GestionCategoria = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda
    const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/category/get')
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
        document.title = "Gestion de Categorias"
        fetchData();
    }, []);
    const handleCrear = () => {
        navigate('/CrearCategoria')
    }
    const handleCancel = async (idCategory) => {
        try {
            await axios.put(`http://localhost:8080/api/category/cancel/${idCategory}`);
            // Actualizar la tabla después de cancelar la solicitud
            fetchData(); 
        } catch (error) {
            console.error('Error al eliminar la dependencia: ', error);
        }
    };
    useEffect(() => {
        const filtered = data.filter(item =>
            String(item.nameCategory).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.dependence.nameDependence).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.state.description).toLowerCase().includes(filterText.toLowerCase()) 
            
        );
        setFilteredData(filtered);
    }, [filterText, data]); // Se ejecuta cuando cambia filterText o data
    
    const columns = [
        {
            name: 'Categoria',
            selector: row => row.nameCategory
        },
        {
            name: 'Dependencia',
            selector: row => row.dependence.nameDependence
        },
        {
            name: 'Estado Categoria',
            selector: row => row.state.description || row.state
        },
        {
            name: 'Editar',
            cell: row => (
                <div className='accion'>
                    <div className="versoli">
                        <FaSearch />
                    </div>
                    <div className="eliminarsoli" onClick={() => handleCancel(row.idCategory)}>
                        <MdOutlineCancel />
                    </div>
                </div>
            )
        }

    ]

    return (
        <div className='GestionCategoria'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
            <div className="headers">
                     <h1 className="title">GESTION DE CATEGORIAS</h1>
                    <div className="user-menu">
                        <UserinfoAmin/>

                    </div>
                </div>
               
                <div className="form">
                    <form className="gestionCate-form">
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

export default GestionCategoria;
