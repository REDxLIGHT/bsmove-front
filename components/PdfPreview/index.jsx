import React, { useState } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';
import { makeStyles } from '@material-ui/core';

import messages from './messages';
import LoadingComponent from '../LoadingComponent';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js`;

const usePageStyles = makeStyles(theme => ({
  page: {
    width: '100%',
  },
}));

const S = {};

S.Document = styled.div`
  width: 100%;

  margin-bottom: 100px;

  canvas {
    width: 100% !important;
    height: auto !important;
  }

  .react-pdf__Page__textContent {
    display: none;
  }
`;

S.PdfLoading = styled.div`
  box-sizing: border-box;
  padding: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

S.PdfTextLoading = styled.p`
  ${props => props.theme.fonts.subtitle};
`;

const PdfPreview = ({ base64 }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const pageStyles = usePageStyles();
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <S.Document>
      <Document
        file={`data:application/pdf;base64,${base64}`}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={(
          <S.PdfLoading>
            <S.PdfTextLoading>{messages.loadingMessage}</S.PdfTextLoading>
            <LoadingComponent />
          </S.PdfLoading>
        )}
      >
        <Page
          className={pageStyles.page}
          pageNumber={pageNumber}
        />
      </Document>
    </S.Document>
  );
}

export default PdfPreview;
