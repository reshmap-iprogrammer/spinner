import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import infoIcon from '../Assets/images/Icon_Info.svg'
import closeIcon from '../Assets/images/close.svg'

function CommonModal({ showModal, toggle, spinnerValue, image, spinData, flagData }) {
  const claimReaward = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(spinData[0]?.props?.children?.props?.children)
    }
  }
  return (
    <div>
      <Modal className='modalWrapper' isOpen={showModal} toggle={toggle}>
        <div className='closeIconWrapper'>
          <img src={closeIcon} onClick={toggle} height={32} width={32} />
        </div>
        <ModalHeader toggle={toggle} style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: '0px'
        }}>
          <p >Congratulations</p>
        </ModalHeader>
        {flagData === 0 ? <p style={{ textAlign: 'center' }}>here is your reward</p> : 
        <p style={{ textAlign: 'center' }}>your reward is being proceed!</p>
      }
        <ModalBody>
          <div className='data'>
            <h5 >{spinnerValue}</h5>
          </div>
          <div className='d-flex justify-content-center'>
            <img src={infoIcon} height={20} />
            <p>This will be reflect in your account within 24 hrs</p>
          </div>
          {flagData === 0 ? <><div className='backHomeButton' onClick={claimReaward}>
            <p className='text-center text-white p-3 backHomeText'>claim reward</p>
          </div></> : <>
            <div className='backHomeButton' >
              <p className='text-center text-white p-3 backHomeText'>back home</p>
            </div>
          </>}
          <p style={{ textAlign: 'center' }}>you may also view this later in reward history</p>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default CommonModal