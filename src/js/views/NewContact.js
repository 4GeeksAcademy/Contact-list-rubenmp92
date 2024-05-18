import React, { useState, useContext } from 'react'
import { Context } from '../store/appContext';
import { Link, useNavigate} from 'react-router-dom'

function NewContact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    
    const {store, actions} = useContext(Context)
    const navigate = useNavigate();

    //funcion al hacer click en save 
    const handleSave = () => { 

        if (!name || !email || !phone || !address) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }


    const newContact = {
        full_name: name,
        email: email,
        agenda_slug: "leorodriguez",
        phone: phone,
        address: address,
        
    };
    console.log(newContact);
    //limpiar los inputs
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    
    actions.createNewContact(newContact)
    navigate("/")


    }

   
return (
    <div className='container'>
        <h1 className='text-center'>Add a new contact</h1>
        <Link to={"/"}>
        <i className="fa-solid fa-arrow-left" style={{color: "#ffffff", marginBottom: "20px"}}></i>
      </Link>
        <div className="mb-3">
            <label className="form-label">Full name</label>
            <input type="text" className="form-control" placeholder="full name" value={name} onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div className="mb-3">
            <label className="form-label">Email </label>
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" placeholder="Enter phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" placeholder="Enter adress" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
        </div>
        <div className="d-grid gap-2">
            <button className="btn saveContactBtn" type="button" onClick={handleSave} >Save</button>
        </div>

    </div>
)
}

export default NewContact;