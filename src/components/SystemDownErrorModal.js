import React from 'react'
import { Link } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import closeIcon from '../Assets/images/close.svg'
import systemDown from '../Assets/images/lottie.svg'

function SystemDownErrorModal({offerApplicable, toggle}) {

  return (
    <div>
       <Modal className='modalWrapper' isOpen={offerApplicable} toggle={toggle}>
        <div className='closeIconWrapper'>
          <img src={closeIcon} onClick={toggle} height={32} width={32}/>
        </div>
          <ModalBody>
            <div className='text-center systemDownWrapperImage'>
              <img src={systemDown} className="systemDownImage"/>
            </div>
            <div>
              <p className='text-center systemDownText'>oops! servers are not responding at the moment</p>
              <div className='backHomeButton'>
                <p className='text-center text-white backHomeText p-3'>retry</p>
              </div>
            </div>
          </ModalBody>
        </Modal>
    </div>
  )
}

export default SystemDownErrorModal