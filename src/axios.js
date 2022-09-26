import axios from "axios";

const Axios = ()=>{
    const promise = axios.get('http://localhost:3001/notes');
    let datos = [];
    console.log(promise);

    promise.then((promise)=>{
        console.log('dentro de then... ', promise);
        datos = promise.data;
        console.log(datos);
    })

    //const promise2 = axios.get('http://localhost:3001/note')
    //console.log(promise2);

    return (
        <div>
            <h1>Probando AXIOS</h1>
            <p>el primer dato es: {datos[0].content}</p>
        </div>
        
        
    )
}

export default Axios;