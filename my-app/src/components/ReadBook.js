import React from 'react';
import BookReader from './bookReader';
const ReadBook = () => {
    console.log("name")
    const bookUrl="https://publuu.com/flip-book/807129/1779287/page/12"
  return (
    <div>
        <BookReader pdfUrl={bookUrl} />
    
    </div>
  )
}

export default ReadBook;
