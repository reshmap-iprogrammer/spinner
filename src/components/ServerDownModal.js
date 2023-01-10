import React from 'react'
import { Modal, ModalBody } from 'reactstrap';
import closeIcon from '../Assets/images/close.svg'
import systemDown from '../Assets/images/lottie.svg'
import { useNavigate } from 'react-router-dom';

function ServerDownModal({serverDown, toggle}) {
  const navigate = useNavigate();

  return (
    <div>
       <Modal className='modalWrapper' isOpen={serverDown} toggle={toggle} backdrop="static">
        {/* <div className='closeIconWrapper'>
          <img src={closeIcon} onClick={toggle} height={32} width={32}/>
        </div> */}
          <ModalBody>
            <div className='text-center systemDownWrapperImage'>
              <img src={systemDown} className="systemDownImage"/>
            </div>
            <div>
              <p className='text-center serverDownText'>looks like our servers are down</p>
              <p className='text-center retryText'>Please retry in sometime to spin the wheel</p>
              <div className='backHomeButton'  onClick={() => navigate(-2)}>
                <p className='text-center text-white backHomeText closeBtn p-3'>close</p>
              </div>
            </div>
          </ModalBody>
        </Modal>
    </div>
  )
}

export default ServerDownModal