import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import infoIcon from '../Assets/images/Icon_Info.svg'
import closeIcon from '../Assets/images/close.svg'

function CommonModal({showModal, toggle, spinnerValue, image}) {
  const claimReaward = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(spinnerValue))
}
  }
  return (
    <div>
    <Modal className='modalWrapper' isOpen={showModal} toggle={toggle}>
    <div className='closeIconWrapper'>
          <img src={closeIcon} onClick={toggle} height={32} width={32}/>
        </div>
      <ModalHeader toggle={toggle} style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: '0px'
      }}>
        <p >Congratulations</p>
      </ModalHeader>
      <p style={{ textAlign: 'center' }}>your reward is being proceed!</p>
      <ModalBody>
        <div className='data'>
          {/* <div className='dataTextWrapper'>
            <img src={image} height={30} width={30} className="giftIcon"/>
          </div> */}
          <h5 style={{ textAlign: 'center' }}>{spinnerValue}</h5>
        </div>
        <div className='d-flex justify-content-center'>
          <img src={infoIcon} height={20} />
          <p>This will be reflect in your account within 24 hrs</p>
        </div>
        <div className='backHomeButton' onClick={claimReaward}>
        <p className='text-center text-white p-3 backHomeText'>back home</p>
        </div>
        {/* <Button size="lg" block  className='backbtn'>back home</Button> */}
        <p style={{ textAlign: 'center' }}>you may also view this later in reward history</p>
      </ModalBody>
    </Modal>
  </div>
  )
}

export default CommonModal