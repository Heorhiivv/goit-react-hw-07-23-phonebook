import { useSelector, useDispatch } from 'react-redux';
import {
  getContacts,
  getFilteredContacts,
  // getIsLoading,
  // getError,
} from '../../redux/selectors';
// import { removeContact } from '../../redux/contactsSlice';
import { fetchContacts } from '../../redux/operations';
import { useEffect } from 'react';

export const ContactsList = () => {
  const { filter } = useSelector(getFilteredContacts);
  const { contacts, isLoading, error } = useSelector(getContacts);
  // const { isLoading } = useSelector(getIsLoading);
  // const { error } = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const cont = () => {
    if (filter) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return contacts;
    }
  };
  const filteredResult = cont();

  return (
    <>
      {isLoading && !error && <b>Request in progress...</b>}
      <ul>
        {filteredResult.map(({ name, number, id }) => (
          <li key={id}>
            <p>
              {name}: {number}
            </p>
            {/* <button type="button" onClick={() => dispatch(removeContact(id))}>
              Delete
            </button> */}
          </li>
        ))}
      </ul>
    </>
  );
};
