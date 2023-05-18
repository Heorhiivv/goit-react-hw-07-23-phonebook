import React, { useState } from 'react';
import { addContact } from '../../redux/operations';
import { useDispatch } from 'react-redux';

export const PhonebookForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const onNameFormSubmit = e => {
    e.preventDefault();
    const credentials = { name, phone };
    dispatch(addContact(credentials));
    reset();
  };

  const onInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setPhone(value);
        break;

      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <>
      <form onSubmit={onNameFormSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={onInputChange}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={phone}
            onChange={onInputChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    </>
  );
};
