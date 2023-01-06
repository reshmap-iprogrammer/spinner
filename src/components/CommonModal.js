import React,{useState, useEffect} from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import infoIcon from '../Assets/images/Icon_Info.svg'
import closeIcon from '../Assets/images/close.svg'
import Loader from './Loader';

function CommonModal({ showModal, toggle, spinnerValue, flagData, rewardDesc, benefit, spinnerValues, msisdn, parentMsisdn }) {
  const [loading, setLoading] = useState(false);


  const claimReaward = () => {
    setLoading(true)
    const data = spinnerValues?.map((item) => item?.benefit_id)
    const newArr = data.filter((item) => item !== null)
    // const obj1 = Object.assign({}, newArr);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(newArr));
      // window.ReactNativeWebView.postMessage(JSON.stringify(obj1));
      // window.ReactNativeWebView.postMessage(benefit[0]?.props?.children?.props?.children)
    }
    setLoading(false); 
  }
  return (
    <div>
      <Modal className='modalWrapper' isOpen={showModal} toggle={toggle} backdrop="static">
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
            <p>This will be reflect in {msisdn === parentMsisdn ? parentMsisdn : msisdn}'s account in 24 hrs</p>
          </div>
          
          {flagData === 0 ? <><div className='backHomeButton' onClick={claimReaward}>
            <p className='text-center text-white p-3 backHomeText'>{!loading ? 'claim reward' : <Loader />}</p>
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