//Agenda para agregar nombres y numeros telefonicos 
import React, { useState } from "react";

let agenda_objeto = [

    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }

];

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
const Numbers = ({ agenda }) => {

    return (
        <div>
            <ul>
                {agenda.map(
                    (contacto) => {
                        return (<li key={contacto.name}>{contacto.name} {contacto.number} </li>)
                    }
                )}
            </ul>
        </div>
    );
}

const Agenda = () => {
    const [agenda, setAgenda] = useState(agenda_objeto); //copia del objeto principal
    const [agenda_filtro, setAgendaFiltro] = useState(agenda_objeto); //agenda a renderizar en la lista
    const [search, setSearch] = useState(''); //Estado del input para buscar
    const [new_person, setNewPerson] = useState({ name: '', number: '' }); //Estado de los input para agregar personas

    //controlador de evento submit
    const handleAddNew = (event) => {
        event.preventDefault()
        const findPerson = (person) => {
            return (
                person.name === new_person.name
            )
        }
        const isPerson = agenda.find(findPerson);

        if (isPerson === undefined) {
            const new_object = { ...new_person };
            setAgenda(agenda.concat(new_object));
            setAgendaFiltro(agenda_filtro.concat(new_object));
        }else{
            alert(`${isPerson.name} ya esta agregado en la agenda`);
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
                let filtro = '';
                for(var i = 0; i < input.length; i++){
                    console.log('for');
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
    
    
    return (
        <div>
            <h1>Phonebook</h1>
            <Search search={search} handleFilterChange={handleFilterChange}/>
            <h2>add a New</h2>
            <AddNew new_person={new_person} setNewPerson={setNewPerson} handleAddNew={handleAddNew}
                handleNameChange={handleNameChange} handleNumChange={handleNumChange}
            />
            <h2>Numbers</h2>
            <Numbers agenda={agenda_filtro} />
        </div>
    )
}

export default Agenda;