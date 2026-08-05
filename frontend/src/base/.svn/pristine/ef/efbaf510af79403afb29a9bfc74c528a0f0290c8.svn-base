import React, { Fragment, useEffect, useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//    'pdfjs-dist/build/pdf.worker.min.js',
//    import.meta.url,
// ).toString();

interface PDFViewerProps {
   base64?: string
}

const PDFViewer: React.FC<PDFViewerProps> = (props) => {
   const { base64 } = props;
   const [numPages, setNumPages] = useState<number>(1);
   const [pdfBlob, setPdfBlob] = useState<Blob>();

   if (!pdfBlob)
      return (<></>);

   useEffect(() => {

      const byteCharacters = atob(base64!);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
         byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      setPdfBlob(blob);
      console.log(blob);

   }, [base64])

   return (
      <Fragment>
         {/* <Document
            file={pdfBlob}
            onLoadSuccess={proxy => {
               setNumPages(proxy.numPages);
            }}
         >
            <Page pageNumber={1} />
         </Document>
         <p>Page 1 of {numPages}</p> */}
      </Fragment>
   );
}

export default PDFViewer;