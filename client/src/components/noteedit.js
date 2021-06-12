import { useContext, useEffect, useState } from 'react';

import { GlobalContext } from '../context/GlobalState';

function Noteedit(route) {
  const { notes, getOneNote, addNote } = useContext(GlobalContext);
  const [selectedNotes, setselectedNotes] = useState({
    _id: '',
    title: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    getNotesData();
    // eslint-disable-next-line
  }, []);

  async function getNotesData() {
    const currentNoteId = route.match.params.id;
    let response = await fetch(
      process.env.REACT_APP_SECRET_URL + '/' + currentNoteId
    );
    const data = response.json();
    if (!response.ok) {
      console.log('error fetching data');
    }
    getOneNote(data);
    const selectedNote = notes.find((note) => data.id === note.id);
    console.log("🚀 ~ file: noteedit.js ~ line 30 ~ getNotesData ~ selectedNote", selectedNote)

  
    // const selectedCatalogueItem = catalogueItems.find(catalogueItem => catalogueItem.sku === catalogueItemSku);
    // setSeletedCatalogueItem(selectedCatalogueItem);

    // employees.find(
    //   (currentEmployeeTraversal) => currentEmployeeTraversal.id === parseInt(employeeId)
    // );
    // console.log(selectedNote._id);
    setselectedNotes(selectedNote);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(selectedNotes._id);

    const request = new Request(process.env.REACT_APP_SECRET_URL, {
      method: 'POST',
      body: JSON.stringify(selectedNotes),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    fetch(request)
      .then(addNote(JSON.stringify(selectedNotes)))
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnChange = (userKey, newValue) =>
    setselectedNotes({ ...selectedNotes, [userKey]: newValue });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={selectedNotes.title}
            onChange={(e) => handleOnChange('title', e.target.value)}
            placeholder="Enter title..."
          />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <textarea
            type="text"
            value={selectedNotes.description}
            onChange={(e) => handleOnChange('description', e.target.value)}
            placeholder="Enter description..."
          />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <textarea
            type="text"
            value={selectedNotes.date}
            onChange={(e) => handleOnChange('date', e.target.value)}
            placeholder="Enter date..."
          />
        </div>
        <button>Add notes</button>
      </form>
    </div>
  );
}

export default Noteedit;
