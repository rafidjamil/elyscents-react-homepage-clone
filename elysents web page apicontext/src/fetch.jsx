import React, { useEffect, useState } from 'react'


export const JSON_PLACEHOLDER = () => {

    const API_URL = "https://jsonplaceholder.typicode.com"
    const [todos, setTodods] = useState([])

    const getAllTodos = async () => {
        try {
            await fetch(`${API_URL}/posts?_sort=id&_order=asen`)
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    setTodods(json)
                })

        } catch (error) {
            console.log(error);

        }
    }

    


    useEffect(() => {
        getAllTodos()   
    }, [])



    return (
        <div>
            <h1>Todos</h1>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
                {
                    todos.map((t, i) => {
                        return <div style={{ marginBottom: "20px", borderBottom: "1px solid", width: "250px" }}>
                            <h3>{t.userId}</h3>
                            <p>{t.id}</p>
                            <p>{t.title}</p>
                            <p>{t.completed}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
