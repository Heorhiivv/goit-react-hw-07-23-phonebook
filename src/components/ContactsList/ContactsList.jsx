import { useSelector, useDispatch } from 'react-redux';
import {
  getContacts,
  getFilteredContacts,
  getIsLoading,
  getError,
} from '../../redux/selectors';
import { fetchContacts, deleteContact } from '../../redux/operations';
import { useEffect } from 'react';

export const ContactsList = () => {
  const { filter } = useSelector(getFilteredContacts);
  const { contacts } = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contactFilter = () => {
    if (filter) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return contacts;
    }
  };
  const filteredResult = contactFilter();

  return (
    <>
      {isLoading && !error && <b>Request in progress...</b>}
      <ul>
        {filteredResult.map(({ name, phone, id }) => (
          <li key={id}>
            <p>
              {name}: {phone}
            </p>
            <button type="button" onClick={() => dispatch(deleteContact(id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
