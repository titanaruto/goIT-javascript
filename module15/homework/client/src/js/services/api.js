const URL = "http://localhost:3000/notes";
export const getNotes = async () => {
    try {
        const notes = await fetch(URL);
        return notes.json();
    }
    catch (err) {
        throw err;
    }

};

export const saveNote = async note => {
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    };
    try {
        const note = await fetch(URL, opts);
        return note.json();
    }
    catch (err) {
        throw err;
    }
};

export const deleteNote = async id => {
    const opts = {
        method: 'DELETE',
    };
    try {
        const note = await fetch(`${URL}/${id}`, opts);
        return note.json();
    }
    catch (err) {
        throw err;
    }
};

export const updateNote = async (id, item) => {
    const opts = {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    };
    try {
        const note = await fetch(`${URL}/${id}`, opts);
        return note.json();
    }
    catch (err) {
        throw err;
    }
};