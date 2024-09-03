import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { ContactProvider } from './context/ContactContext';
import { useEffect, useState } from 'react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);

  const addContact = (contact) => {
    setContacts((prev) => [{ id: Date.now(), ...contact }, ...prev]);
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const updateContact = (contact,id) => {
    setContacts((prev) =>
      prev.map((prevContact) => (prevContact.id === id ? contact : prevContact))
    );
    setCurrentContact(null);
  };

  const clearCurrentContact = () => {
    setCurrentContact(null);
  };

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts && contacts.length > 0) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <ContactProvider value={{ contacts, addContact, updateContact, deleteContact, clearCurrentContact }}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <Navbar />
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ContactForm currentContact={currentContact} />
          </div>
          <div className="mt-8">
            <ContactList contacts={contacts} setCurrentContact={setCurrentContact} />
          </div>
        </div>
      </div>
    </ContactProvider>
  );
};

export default App;
