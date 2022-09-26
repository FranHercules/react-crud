//Agenda para agregar nombres y numeros telefonicos 
//import axios from "axios";
import React, { useState, useEffect } from "react";
import  './index.css';
import agendaServices from './services';

/*
let agenda_objeto = [

    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }

];
*/

//Componente para buscar a una persona
const Search = ({search, handleFilterChange}) => {
    console.log(search)
    return (
        <div>
            <label>Filter: </label>
            <input value={search} onChange={handleFilterChange}></input>
        </div>
    );
}

//Componente para agregar nuevas personas
const AddNew = ({ new_person, handleAddNew, handleNameChange, handleNumChange }) => {
    return (
        <div>
            <form onSubmit={handleAddNew}>
                <label>Name: </label>
                <input value={new_person.name} onChange={handleNameChange}></input>
                <br />
                <label>Numero: </label>
                <input value={new_person.number} onChange={handleNumChange}></input>
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

//Componente para listar las personas
const Numbers = ({ agenda, handleClick}) => {

    return (
        <div>
            <ul>
                {agenda.map(
                    (contacto) => {
                        return (
                            <li key={contacto.name}>
                                <label>{contacto.name} {contacto.number} </label>
                                <button value={contacto.id} onClick={handleClick}>delete</button>
                            </li>
                        )
                    }
                )}
            </ul>
        </div>
    );
}

const Notification = ({message})=>{
    if(message===null){
        return null
    }
    
    else if(message === "La persona ya esta eliminada"){
        return(
            <div className="error">
                {message}
            </div>
        )
        
    }
    return(
        <div className="notification">
            {message}
        </div>
    )
}

//Componente principal
const Agenda = () => {
    const [agenda, setAgenda] = useState([]); //copia del objeto principal
    const [agenda_filtro, setAgendaFiltro] = useState([]); //agenda a renderizar en la lista
    const [search, setSearch] = useState(''); //Estado del input para buscar
    const [new_person, setNewPerson] = useState({ name: '', number: '' }); //Estado de los input para agregar personas
    const [message_error, setMessageError] = useState(null); 

    //useEfect
    useEffect(()=>{
        
        //remplazo de axios.get
        agendaServices.getAll().then(
            (promise)=>{
                let datos = promise.data
                console.log(datos)
                setAgenda(datos);
                setAgendaFiltro(datos);
            }
        ).catch(error => console.log('Error de servidor BD ', error));
    },[])



    //controlador de evento submit
    const handleAddNew = (event) => {
        event.preventDefault()

        //funcion para verificar si la persona existe
        const findPerson = (person) => {
            return (
                person.name === new_person.name
            )
        }

        //Bandera si esta o no esta la persona
        const isPerson = agenda.find(findPerson);

        if (isPerson === undefined) {
            const new_object = { ...new_person };
            agendaServices.create(new_object)
                .then((response)=>{
                    //Se agrega el contacto al estado con la lista y la copia principal
                    setAgendaFiltro(agenda.concat(response.data));
                    setAgenda(agenda.concat(response.data));
                    setNewPerson({...new_person,name:'',number:''});

                    //Notificacion de exito
                    setMessageError("El nuevo contacto ha sido agregada");
                    setTimeout(()=>{
                        setMessageError(null)
                    }, 5000)

                })
                .catch((error)=>{
                    alert('El numero no se pudo agregar al servidor')
                })
            //setAgenda(agenda.concat(new_object));
            //setAgendaFiltro(agenda_filtro.concat(new_object));
        }else{
            //Logica para actualizar una persona ya agregada
            console.log(isPerson);
            if(window.confirm("Esta seguro que quiere modificar el numero de este usuario")){
                
                //El nuevo objeto es la persona ya repetida con su nuevo numero
                const new_object = {...isPerson, number: new_person.number}

                agendaServices.updatePerson(isPerson.id,new_object).then(
                    (response)=>{
                        //Constantes necesarias para cambiar el estado para actualizar
                        const position_agenda = agenda.findIndex((element)=>element.id===isPerson.id)
                        const agenda_copy = [...agenda];
                        agenda_copy.splice(position_agenda,1,new_object) //metodo para modificar el elemento del arreglo

                        setAgenda(agenda_copy)
                        setAgendaFiltro(agenda_copy)
                        
                    }
                )


                alert(`${isPerson.name} ya esta agregado en la agenda`);

            }

        }
    };

    //controlador de evento onChange para el input de name
    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewPerson({ ...new_person, name: event.target.value });
    };

    //controlador de evento onChange para el input de num
    const handleNumChange = (event) => {
        console.log(event.target.value);
        setNewPerson({ ...new_person, number: event.target.value });
    };

    //controlador de evento onChange en el imput de filtro
    const handleFilterChange = (event) => {
        console.log(event.target.value);

        //Se comprueba si el input esta vacio para asignar la lista completa al estado
        //En caso contrario se comprueba si lo del input va siendo igual a los nombres en el estado
        if(event.target.value === ''){
            setAgendaFiltro(agenda);
        }else{
            const input= event.target.value;
            const agenda_filter = agenda.filter((persona) => {
                //Se compara cada persona que coincida con el filtro letra por letra
                let filtro = '';
                for(var i = 0; i < input.length; i++){
                    console.log('for');
                    console.log(input.length);
                    if(persona.name[i]===input[i]){
                        filtro=filtro + persona.name[i]
                    }else{
                        console.log("No existe el nombre")
                    }
                }
                if(filtro===input){
                    return true;
                }else{return false};
                
            })
            //Se asigna la agenda filtrada al estado
            setAgendaFiltro(agenda_filter);
        }
        setSearch(event.target.value);
    };

    //Controlador de evento CLick delete
    const handleClickDelete = (event)=>{
        console.log(event.target);
        const id = Number(event.target.value);

        //funcion para verificar si la persona no esta eliminada
        const findPerson = (person) => {
            return (person.id === id)
        }

        //Bandera si esta o no esta la persona
        const isPerson = agenda.find(findPerson);

        //Condicion para comprobar si existe para ser eliminado
        if(isPerson === undefined){
            setMessageError("La persona ya esta eliminada");
            setTimeout(()=>{
                setMessageError(null)
            },5000)
        }else{
            if(window.confirm("Esta seguro que quiere eliminar a la persona")){
                agendaServices.deletePerson(event.target.value).then(
                    (promise)=>{
    
                        //Objetos para cambiar los estados de "agenda" y "agenda_filtro"
                        const copia_agenda= agenda.filter((persona)=>persona.id !== id);
                        const copia_agenda_filtro= agenda_filtro.filter((persona)=>persona.id !== id);
    
                        setAgenda(copia_agenda);
                        setAgendaFiltro(copia_agenda_filtro);
                    }
                ).catch(error=>{
                    setMessageError("La persona ya esta eliminada");
                    setTimeout(()=>{
                        setMessageError(null)
                    },5000)

                    setAgenda(agenda.filter((n => n.id !== id)))
                    setAgendaFiltro(agenda_filtro.filter((n => n.id !== id)))
                })
            }else{
                console.log("Se cancelo la eliminacion");
            }
        }

    }
    
    
    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message_error}/>
            <Search search={search} handleFilterChange={handleFilterChange}/>
            <h2>add a New</h2>
            <AddNew new_person={new_person} setNewPerson={setNewPerson} handleAddNew={handleAddNew}
                handleNameChange={handleNameChange} handleNumChange={handleNumChange}
            />
            <h2>Numbers</h2>
            <Numbers agenda={agenda_filtro} handleClick={handleClickDelete} />
        </div>
    )
}

export default Agenda;