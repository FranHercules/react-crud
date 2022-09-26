import axios from "axios"
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (new_object)=>{
    return (axios.post(baseUrl,new_object))
}

const deletePerson = (id)=>{
    return(axios.delete(`${baseUrl}/${id}`))
}

const updatePerson = (id, new_object)=>{
    return(axios.put(`${baseUrl}/${id}`, new_object));
}


//Objeto a exportar
const metodos = {
    getAll,create,deletePerson,updatePerson
}

export default metodos;

