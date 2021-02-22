import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


function EditProfile({ reload, data }) {
    const login = useSelector(state => state.login)
    const { userID } = useParams()

    const dispatch = useDispatch()

    const [displayName, setDisplayName] = useState(login.name || '')
    const [displaySurname, setDisplaySurname] = useState(login.surname || '')
    const [displayBirth, setDisplayBirth] = useState(login.birthData || '')
    const [displayCountry, setDisplayCountry] = useState(login.country || '')
    const [displayUsername, setDisplayUsername] = useState(login.username || '')
    const [error, setError] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        const avatar = e.target.avatar.files[0]

        const fd = new FormData()
        fd.append('avatar', avatar)
        fd.append('name', displayName)
        fd.append('surname', displaySurname)
        fd.append('birthDate', displayBirth)
        fd.append('country', displayCountry)
        fd.append('username', displayUsername)

        console.log(fd);

        const res = await fetch(`http://localhost:3001/users/${userID}`, {
            method: 'PUT',
            headers: { 'auth': login.token },
            body: fd
        }).then(res => {
            if (!res.ok) {
              console.log('Se ha producido un error');
              throw res;
            }
            console.log('El fetch se ha realizado correctamente');
            return res.json()
          })
          .then(data => {
            // Enviar objeto action al redux, con el type y los datos obtenidos de la API
            dispatch({ type: 'update', data })
          })
          .catch(e => 
            // Capturar error
            e.text().then(e => setError(e))
          )

        reload()
    }


    return (
        <div className='expert-profile-edit'>
            <form onSubmit={handleSubmit}>
                {/* <img src={`http://localhost:3001/${data.avatar}`} alt="avatar-editar"/> */}
                <input name='avatar' type='file' accept='image/*' />
                <input type="text" placeholder='Username...' value={displayUsername} onChange={e => setDisplayUsername(e.target.value)} minLength='3'/>
                <input type="text" placeholder='Nombre...' value={displayName} onChange={e => setDisplayName(e.target.value)} />
                <input type="text" placeholder='Apellido...' value={displaySurname} onChange={e => setDisplaySurname(e.target.value)} />
                <input type="text" placeholder='País...' value={displayCountry} onChange={e => setDisplayCountry(e.target.value)} />
                <input type="date" placeholder='Fecha de nacimiento...' value={displayBirth} onChange={e => setDisplayBirth(e.target.value)} required />
                <button>Guardar</button>
            </form>
            <button onClick={() => reload()}>Cancelar</button>

        </div>
    )
}

export default EditProfile
