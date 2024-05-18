import { json } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [],
			newContact: null 
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			createNewContact: (newContact) => {
				fetch('https://playground.4geeks.com/apis/fake/contact/', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(newContact)
				})
				.then((response)=>{
					if(response.ok){
						console.log("Contacto creado")
						getActions().getAllContacts()
						return response.json()
					}
				})
				.then((data)=>{console.log(data)})

			 },
			 getAllContacts: () => {
				fetch('https://playground.4geeks.com/apis/fake/contact/agenda/leorodriguez')
					.then((response) => {
						if (response.ok) {
							console.log("contactos obtenidos");
							return response.json();
						}
					})
					.then((data) => {
						// Mapea los contactos y agrega el id a cada contacto
						setStore({
							contacts: data.map(contact => ({ ...contact, id: contact.id }))
						});
					})
					.catch(error => {
						console.error('Error fetching contacts:', error);
					});
			},
			
			updateContact: async (contactId, updatedContact) => {
				try {
				  const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
					method: 'PUT',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify(updatedContact),
				  });
			
				  if (response.ok) {
					console.log('Contacto actualizado');
					getActions().getAllContacts(); 
				  } else {
					console.error('Error al actualizar contacto:', response.statusText);
				  }
				} catch (error) {
				  console.error('Error al actualizar contacto:', error);
				}
			  },
			deleteContact: async (contactId) => {
				try {
				  const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
					method: 'DELETE'
				  });
		
				  if (response.ok) {
					console.log('Contacto eliminado');
					getActions().getAllContacts();
				  } else {
					console.error('Error al eliminar contacto:', response.statusText);
				  }
				} catch (error) {
				  console.error('Error al eliminar contacto:', error);
				}
			  },
			deleteAllContacts: async () => {
				try {
					const response = await fetch('https://playground.4geeks.com/apis/fake/contact/agenda/leorodriguez', {
						method: 'DELETE'
					});
			
					if (response.ok) {
						console.log('Contactos eliminados');
						getActions().getAllContacts();
						
					} else {
						console.error('Error al eliminar contactos:', response.statusText);
					}
				} catch (error) {
					console.error("Error al eliminar contactos:", error);
				}
			}
						
            }
		}
	};


export default getState;
