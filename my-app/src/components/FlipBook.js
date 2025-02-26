import React, { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FlipBook = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="flipbook-container">
      <h2 className="text-center">📖 Read Your Book</h2>
      
      <HTMLFlipBook width={500} height={700}>
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index} pageNumber={index + 1} width={500} />
          ))}
        </Document>
      </HTMLFlipBook>
    </div>
  );
};

export default FlipBook;
