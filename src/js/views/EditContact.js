import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link, useParams, useNavigate } from 'react-router-dom';

function EditContact() {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); // Obtener el id del parámetro de la URL
    const [contact, setContact] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: ''
    });
    const navigate = useNavigate()
    // Obtener el contacto específico cuando el componente se monta
    useEffect(() => {
        const selectedContact = store.contacts.find((c) => c.id.toString() === id);
        if (selectedContact) {
            setContact(selectedContact);
        }
    }, [store.contacts, id]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // guardar el contacto actualizado
        actions.updateContact(id, contact);
        navigate("/")

    };

    return (
        <div className="container">
            <h1 className="text-center">Edit contact</h1>
            <Link to={"/"}>
        
      </Link>
            <div className="mb-3">
                <label className="form-label">Full name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    name="full_name"
                    value={contact.full_name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone"
                    name="phone"
                    value={contact.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter address"
                    name="address"
                    value={contact.address}
                    onChange={handleChange}
                />
            </div>
            <div className="d-grid gap-2">
                <button className="btn saveContactBtn" type="button" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default EditContact;