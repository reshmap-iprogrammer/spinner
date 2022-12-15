import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './Styles.css'
import spinImage from '../Assets/images/spin.svg'
import rewardImage from '../Assets/images/claim.svg'
import closeIcon from '../Assets/images/close.svg'


function HowToPlayModal({toggle, howToPlayModal}) {
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
            <a href='' className='termsCondition'>terms and conditions</a>
          </ModalBody>
          </Modal>
    </div>
  )
}

export default HowToPlayModal
