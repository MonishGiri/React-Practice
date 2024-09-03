import {useContext, createContext} from 'react';

export const ContactContext = createContext({
    contacts : [
        {
            id: 1,
            name: "Monish",
            phone : "9773559682",
            email: "monish@gmail.com"
        },
    ],
        addContact : (contact) =>{},
        updateContact : (contact,id) => {},
        deleteContact :  (id) => {},
        clearCurrentContact: () => {}
});

export const useContact = () =>{
    return useContext(ContactContext);
}

export const ContactProvider = ContactContext.Provider;