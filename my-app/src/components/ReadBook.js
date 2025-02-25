import React from 'react';
import BookReader from './bookReader';
const ReadBook = () => {
    console.log("name")
    const bookUrl="https://drive.google.com/file/d/1vCA34whMOWJXinSdW-zgS4zRUe2MTTU7/view…"
  return (
    <div>
        <BookReader pdfUrl={bookUrl} />
    
    </div>
  )
}

export default ReadBook;
