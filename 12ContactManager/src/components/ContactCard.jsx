import { useContact } from '../context/ContactContext';

const ContactCard = ({ contact, setCurrentContact }) => {
  const { deleteContact } = useContact();
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-4">
      <div>
        <h3 className="text-lg font-bold text-gray-800">{contact.name}</h3>
        <p className="text-gray-600">{contact.phone}</p>
        <p className="text-gray-600">{contact.email}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentContact(contact)}
          className="bg-yellow-500 text-white py-2 px-3 rounded hover:bg-yellow-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => deleteContact(contact.id)}
          className="bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
