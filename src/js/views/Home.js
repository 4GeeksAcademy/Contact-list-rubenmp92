import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import CardContact from "./CardContact";

export const Home = () => {
	const {store, actions} = useContext(Context)
	const navigate = useNavigate()
	
	const deleteAllContacts = async () => {
        try {
            await actions.deleteAllContacts();
            alert("Contactos eliminados");
            // Navegar a la página de inicio solo después de que la eliminación sea exitosa
            navigate("/");
        } catch (error) {
            console.error("Error al eliminar contactos:", error);
        }
    };
	return (
	<div className="container">
		<div className="d-flex justify-content-end">
		<Link to="/newContact">
		<button className="btn ">Add new contact</button>

		</Link>
		<button className='btn' onClick={deleteAllContacts}>Delete all contacts</button>
		</div>
		<div className="contactList">
			{store.contacts.length > 0 ? (store.contacts.map((contact, index) => {
					return <CardContact key={index} contact={contact} />
})
			): (<p>Agenda Vacía</p>)}
				
			</div>
	</div>
	)
};
