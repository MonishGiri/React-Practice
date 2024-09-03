import ContactCard from './ContactCard';

const ContactList = ({ contacts, setCurrentContact }) => {
  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} setCurrentContact={setCurrentContact} />
      ))}
    </div>
  );
};

export default ContactList;
