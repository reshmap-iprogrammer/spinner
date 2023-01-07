import React,{useState} from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './Styles.css'
import spinImage from '../Assets/images/spin.svg'
import rewardImage from '../Assets/images/claim.svg'
import closeIcon from '../Assets/images/close.svg'
import { Link } from 'react-router-dom';
import { Document, Page,pdfjs } from 'react-pdf';
import viTerms from '../Assets/documents/vi_app_tnc.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function HowToPlayModal({toggle, howToPlayModal}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(2);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const openInNewTab = () => {
    // window.open(url, '_blank', 'noreferrer');
    const src = "https://www.myvi.in/content/dam/vodafoneideadigital/StaticPages/consumerimages/tnc/new/vi_app_tnc.pdf"
    window.open(src);
    document.open(src);
  };
  return (
    <div>
      <Modal className='modalWrapper' isOpen={howToPlayModal} toggle={toggle}>
        <div className='closeIconWrapper'>
          <img src={closeIcon} onClick={toggle} height={32} width={32}/>
        </div>
          <ModalHeader toggle={toggle} className="PlayHeader">how to play</ModalHeader>
          <ModalBody >
            <div className='d-flex align-items-center mb-4'>
            <img src={spinImage} className="spinImage"/>
            <p className='howToPlaySpin mb-0'>Click on the <span className='spinText'>"SPIN"</span> to spin the wheel </p>
            </div>
            <div className='d-flex align-items-center rewardImageWrapper'>
              <img src={rewardImage} className="rewardImage"/>
            <p className='mb-0'>Claim your reward</p>
            </div>
            <Document file={viTerms}>
    <Page pageNumber={1} />
  </Document>
            {/* <a
              className="termsCondition"
              href="https://www.myvi.in/content/dam/vodafoneideadigital/StaticPages/consumerimages/tnc/new/vi_app_tnc.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              terms and conditions
            </a>
            <p onClick={openInNewTab}>terms and conditions</p> */}
            {/* <Link to="https://www.myvi.in/content/dam/vodafoneideadigital/StaticPages/consumerimages/tnc/new/vi_app_tnc.pdf" className='termsCondition'>terms and conditions</Link> */}
          </ModalBody>
          </Modal>
    </div>
  )
}

export default HowToPlayModal
