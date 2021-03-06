import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GetComment.css';
import Moment from 'react-moment';


function GetComments({ parentID }) {
    const [data, setData] = useState([])
    const login = useSelector(state => state.login)

    // Obtener el ID de la pregunta y de la respuesta
    const { questionID } = useParams()
    // console.log(`Asociando a la pregunta con ID: ${questionID} y a la respuesta con ID: ${parentID}`);

    // Ejecutar fetch al cargar la página
    useEffect(async () => {

        // Enviar consulta a la API
        const res = await fetch(`http://localhost:3001/questions/${questionID}/${parentID}`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
                method: 'GET'
            })

        const data = await res.json();
        setData(data)
        // console.log(`Resultado de la respuesta: ${JSON.stringify(data)}`)
    }, [])

    return (
        <div>
            {data.length >= 1 &&
                <div className="get comments">
                    {data.map((comment, i) =>
                        <div className="comment box">
                            <div className="comment author">
                                <img key={i} className="comment avatar" src={`http://localhost:3001/${comment.avatar}`} alt="avatar" />
                                {comment.username}
                                <Moment format='YYYY/MM/DD'>
                                    {data.creationDate}
                                </Moment>
                            </div>
                            <div key={data.id} dangerouslySetInnerHTML={{__html: comment.body}} className="comment body"></div>
                        </div>
                    )}
                </div>
            }
            {
                data.length < 1 &&

                <div>
                    <i></i>
                </div>
            }
        </div >
    )
}

export default GetComments;