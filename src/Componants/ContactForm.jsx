import React, { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez mettre ici la logique pour envoyer les données du formulaire
    console.log("Formulaire de contact soumis avec succès !");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nom :</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="message">Message :</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default ContactForm;
