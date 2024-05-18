import React, {useContext} from 'react'
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom'

function CardContact({contact}) {
  const {store, actions} = useContext(Context)
  const deleteContact = async () => {
    try {
      await actions.deleteContact(contact.id); 
      alert('Contacto eliminado');
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
    }
  };

  return (
    <div className='container'>
    <div className="contact-card">
      <div className="icons">
      <Link to={`/editcontact/${contact.id}`}>
            <i className="fa-regular fa-pen-to-square icon" />
          </Link>
        <i className="fa-solid fa-trash-can icon" onClick={deleteContact}/>
      </div>
      <div className="circle-image">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Meisje_met_de_parel.jpg/800px-Meisje_met_de_parel.jpg" alt="Avatar" />
      </div>
      <div className="contact-info">
        <p>Nombre y apellido: {contact && contact.full_name}</p>
        <p>Teléfono: {contact && contact.phone} </p>
        <p>Email: {contact && contact.email} </p>
        <p>Dirección: {contact && contact.address}</p>
      </div>
    </div>
  </div>
  
  )
}

export default CardContact;