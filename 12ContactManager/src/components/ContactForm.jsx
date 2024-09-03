import { useEffect, useState } from 'react';
import { useContact } from '../context/ContactContext';

const ContactForm = ({ currentContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { addContact, updateContact, clearCurrentContact } = useContact();

  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setPhone(currentContact.phone);
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [currentContact]);

  const add = (e) => {
    e.preventDefault();
    const contact = { name, email, phone };
    if (currentContact) updateContact( contact, currentContact.id );
    else addContact(contact);

    clearForm();
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    clearCurrentContact();
  };

  return (
    <form onSubmit={add} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        {currentContact ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <div>
        <label className="block text-gray-600">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-2 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter name"
        />
      </div>
      <div>
        <label className="block text-gray-600">Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-2 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter phone number"
        />
      </div>
      <div>
        <label className="block text-gray-600">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full p-2 border border-gray-300 rounded mt-2 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter email address"
        />
      </div>
      <div className="flex justify-center space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          {currentContact ? 'Update Contact' : 'Add Contact'}
        </button>
        {currentContact && (
          <button
            type="button"
            onClick={clearForm}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
