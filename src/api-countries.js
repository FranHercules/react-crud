import axios from "axios";
import React, {useState,useEffect} from "react";


//Componente para busqueda de paises
const Filtro = ({filtro, handleChange})=>{
    return (
        <div>
            <label>search countrie: </label>
            <input value={filtro} onChange={handleChange}></input>
        </div>
    )

}

//Componente para la vista de paises o un pais en especifico
const Lista = ({countries, handleClickShow})=>{

    //Mostrar un solo pais con toda su informacion y si no todos los paises
    if(countries.length === 1){
        return (
            <div>
                <h2>{countries[0].name}</h2>
                <p>capital: {countries[0].capital}</p>
                <p>population: {countries[0].population}</p>
                <h3>Laguages</h3>
                <ul>
                {countries[0].languages.map((language)=>{
                    return (<li key={language.name}>{language.name}</li>)
                })}
                </ul>
                <img src={countries[0].flag} alt="Bandera" width="500" height="341"/>
            </div>
        )
    }else{
        return (
            <div>
                <ul>
                    {countries.map((countrie)=>{
                        return (
                            <li key={countrie.numericCode}>
                                <label>{countrie.name} </label> 
                                <button value={countrie.name} onClick={handleClickShow}>show</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

}

//Componente principal
const App = ()=>{
    //Estados(lista de paises, texto en input, url de api)
    const [countries, setCountries] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [uri, setUri] = useState('https://restcountries.com/v2/all');
    const uri_all = 'https://restcountries.com/v2/all'
    const uri_name = 'https://restcountries.com/v2/name/'

    //UseEffect para consumir la api
    //uri es el estado que activara a useEffect
    useEffect(()=>{
        axios
            .get(uri)
            .then(
                (promise)=>{
                    console.log(promise);
                    const object_countries = promise.data;
                    setCountries(object_countries);
                }
            )
    },[uri]);

    //Controlador de evento Change en input
    const handleChange = (event)=>{
        console.log(event.target.value);
        setFiltro(event.target.value);

        //Mostrar todos los paises o solo uno en especifico
        if(filtro === ''){
            setUri(uri_all);
        }else{
            setUri(`${uri_name}${filtro}`)
        }
    }

    //Controlador de evento Click en boton
    const handleClickShow = (event) => {
        console.log(event.target.value)
        setUri(`${uri_name}${event.target.value}`)
    }

    return (
        <div>
            <Filtro filtro={filtro} handleChange={handleChange} />
            <Lista countries={countries} handleClickShow={handleClickShow}/>

        </div>
    )
}

export default App;