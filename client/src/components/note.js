import React from "react";

const Note = ( { noteData } ) => {
    console.log( noteData )
    return (
        <div className="note-cont">
            <span className='note-text'>{ noteData.noteText }</span>
            <div className='note-details'>
                <span className='note-by'>- { noteData.noteBy.charAt(0).toUpperCase() + noteData.noteBy.slice(1) }</span>
                <span className='note-date'>( { new Date( Number( noteData.createdAt ) ).toLocaleString() } )</span>
            </div>
        </div>
    )
};

export default Note;
