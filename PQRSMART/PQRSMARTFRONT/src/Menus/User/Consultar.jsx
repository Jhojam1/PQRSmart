import React, { useEffect, useState } from 'react';
import '../User/Consultar.css'
import { Menu } from '../../componentes/Menu';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { UserinfoUser } from '../../componentes/Userinfo'
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const Consultar = () => {
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda
    const [filteredsData, setFilteredData] = useState([]); // Estado para los datos filtrados

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
            const response = await axios.get('http://localhost:8080/api/request/get')
            setData(response.data);
            const usuario = localStorage.getItem('users');
            console.log(usuario)
            if (usuario) {
                const filteredData = response.data.filter(item => item.user && item.user.user === usuario); // Filtrar los datos por el usuario
                filteredData.forEach(item => {
                    item.date = new Date(item.date).toDateString();

                });
                setData(filteredData);
                console.log("filteredData  ", filteredData)
            } else {
                setData([]);
            }
            console.log(response.data);
            console.log("esta es la data ", data);
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    useEffect(() => {
        document.title = "Consultar PQRS"
        fetchData();
    }, []);

    const handleCancel = async (idRequest) => {
        try {
            await axios.put(`http://localhost:8080/api/request/cancel/${idRequest}`);
            // Actualizar la tabla después de cancelar la solicitud
            fetchData();
        } catch (error) {
            console.error('Error al cancelar la solicitud: ', error);
        }
    };

    // Filtrar datos cuando cambie el texto de búsqueda
    useEffect(() => {
        const filtered = data.filter(item =>
            String(item.radicado).toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredData(filtered);
    }, [filterText, data]); // Se ejecuta cuando cambia filterText o data

    const columns = [
        {
            name: 'Tipo de Solicitud',
            selector: row => row.requestType.nameRequestType
        },
        {
            name: 'Fecha',
            selector: row => row.date
        },
        {
            name: 'Descripcion',
            selector: row => row.description,
            cell: row => (
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                    {row.description.length > 50 ? `${row.description.slice(0, 50)}...` : row.description}
                </div>
            ),
        },
        {
            name: 'Estado',
            selector: row => row.requestState.nameRequestState
        },
        {
            name: 'Respuesta',
            selector: row => row.answer,
            cell: row => (
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                    {row.answer && row.answer.length > 50
                        ? `${row.answer.slice(0, 50)}...`
                        : row.answer || ''}  {/* Si row.answer es null o undefined, mostramos 'No disponible' */}
                </div>
            ),
        },
        {
            name: 'Accion',
            cell: row => (
                <div className='accion'>
                    <div className="versoli">
                        <FaSearch />
                    </div>
                    <div className="eliminarsoli" onClick={() => handleCancel(row.idRequest)}>
                        <MdOutlineCancel />
                    </div>
                </div>
            ),

        },

    ]

    return (
        <div className='consultarPqrs'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <Menu />
            </div>
            <div className="cuerpo">
                <div className="headers">
                    <h1 className="title">CONSULTAR SOLICITUD</h1>
                    <div className="user-menu">
                        <UserinfoUser />

                    </div>
                </div>

                <div className="formConsultar">
                    <form className="consultar-form">
                        <div className="busqueda">
                            <label>Introduce Tu Numero De Radicado</label>
                            <input type="text"
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)} // Actualiza el estado del texto de búsqueda
                            />
                        </div>
                        <label className='nota' >Nota: Con La X Puede Cancelar Su Solicitud</label>
                        <DataTable
                            columns={columns}
                            data={filteredsData}
                            fixedHeader
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

export default Consultar;
