import React from "react";

const NoteForm = () => (
    <form className="note-form">
        <label htmlFor="newNote">Add new note:</label>
        <textarea name="newNote" rows="5">

        </textarea>
        <button type="submit">Add note</button>
    </form>
);

export default NoteForm;
