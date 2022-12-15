import React from 'react'
import giftIcon from '../Assets/images/gift.svg'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

function ClaimRewardModal() {
  return (
    <div>
       <Modal className='modalWrapper' isOpen={howToPlayModal} toggle={toggle}>
        <div className='closeIconWrapper'>
          <img src={closeIcon} onClick={toggle} height={32} width={32}/>
        </div>
          <ModalHeader style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: '0px'
      }} className="rewardModalHeader">hey there</ModalHeader>
      <ModalBody>
        <div>
          <p className='text-center rewardProceed'>your reward was processed on 13 Sep 2022</p>
          <div className='data'>
          <div className='dataTextWrapper'>
            <img src={giftIcon} height={100} className="giftIcon"/>
          </div>
          <h5 style={{ textAlign: 'center' }}>1 GB data for 1 day</h5>
        </div>
        <div className='backHomeButton'>
        <p className='text-center text-white p-3 backHomeText'>back home</p>
        </div>
        </div>
      </ModalBody>
        </Modal>
    </div>
  )
}

export default ClaimRewardModal