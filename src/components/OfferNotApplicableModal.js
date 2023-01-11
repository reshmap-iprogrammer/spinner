import React from 'react'
import { Link } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import closeIcon from '../Assets/images/close.svg'
import offersNotApplicable from '../Assets/images/RechargeNotApplicable.svg'
import { useNavigate } from 'react-router-dom';

function OfferNotApplicableModal({offerApplicable, toggle}) {
  const navigate = useNavigate();

  return (
    <div>
       <Modal className='modalWrapper' isOpen={offerApplicable} toggle={toggle}>
        <div className='closeIconWrapper'>
          <img src={closeIcon} onClick={toggle} height={32} width={32}/>
        </div>
          <ModalBody>
            <div className='text-center'>
              <img src={offersNotApplicable} className="offerNotApplication"/>
            </div>
            <div>
              <p className='text-center offerNotApplicable'>oops! offer not applicable for you as of now!</p>
              <p className='text-center applicableText'>You may recharge again after 48 hours to be eligible for spin the wheel again</p>
              <div className='backHomeButton' onClick={() => navigate(-1)}>
                <p className='text-center text-white backHomeText p-3'>back home</p>
              </div>
              <Link to="rewardHistory" className='howToPlayText text-center d-block'>reward history</Link>
            </div>
          </ModalBody>
        </Modal>
    </div>
  )
}

export default OfferNotApplicableModal