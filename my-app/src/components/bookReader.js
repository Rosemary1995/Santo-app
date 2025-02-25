import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const BookReader = ({ pdfUrl, userEmail }) => {
  const [numPages, setNumPages] = useState(null);

  // Disable right-click and keyboard shortcuts
  useEffect(() => {
    const disableShortcuts = (e) => {
      if (e.ctrlKey && ["s", "p", "u"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("keydown", disableShortcuts);
    return () => {
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
      document.removeEventListener("keydown", disableShortcuts);
    };
  }, []);

  return (
    <div style={styles.readerContainer}>
      <div style={styles.watermark}>{userEmail}</div>
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
};

// Styling
const styles = {
  readerContainer: {
    position: "relative",
    textAlign: "center",
    background: "#f5f5f5",
    padding: "20px",
  },
  watermark: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "24px",
    color: "rgba(0,0,0,0.2)",
    pointerEvents: "none",
    zIndex: 10,
  },
};

export default BookReader;




