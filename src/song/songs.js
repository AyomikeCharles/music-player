import { useState, useEffect } from "react";



const useSongApi = (url) =>{

    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7431c3e901msh15bf1447ed1d8b9p15ce3ejsna13ad65c147e',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    useEffect(()=>{
        fetch(url, options)
        .then(response => response.json())
        .then((result)=>{
            setError(result.error)
            setData(result)
            setLoading(false)
        })


    },[url])
    
   return {data,loading,error}

}

export default useSongApi;

