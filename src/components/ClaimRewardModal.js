import React, {useState} from 'react'
import giftIcon from '../Assets/images/gift.svg'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import closeIcon from '../Assets/images/close.svg'
import moment from 'moment';
import { getRequestData } from '../services/RequestHandler';
import { route } from '../services/ApiRoutes';
import './Styles.css'

function ClaimRewardModal({showModal, toggle, getRewards}) {

  const [claimReward, setClaimReward] = useState('')

  const claimRewards =async () => {
    const claimRewardResponse = await getRequestData(
      `${route["CLAIM_REWARDS"]}?id=${getRewards?.id}`
    );
    setClaimReward(claimRewardResponse?.data?.message)
  }

  return (
    <div>
       <Modal className='modalWrapper' isOpen={showModal} toggle={toggle} backdrop="static">
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
          <p className='text-center justify-content-center d-flex rewardProceed'>your reward was processed on <p className='fw-bold rewardHistoryDate'> {moment(getRewards?.created_at).format('DD MMM YYYY')}</p></p>
          <div className='data'>
          <div className='dataTextWrapper'>
            <img src={giftIcon} height={100} className="giftIcon"/>
          </div>
          <h5 style={{ textAlign: 'center' }}>{getRewards?.description}</h5>
        </div>
        <div className='backHomeButton' onClick={claimRewards}>
        <p className='text-center text-white p-3 backHomeText'>back home</p>
        </div>
        </div>
      </ModalBody>
        </Modal>
    </div>
  )
}

export default ClaimRewardModal