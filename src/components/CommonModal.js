import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import infoIcon from '../Assets/images/Icon_Info.svg'
import closeIcon from '../Assets/images/close.svg'
import Loader from './Loader';
import CryptoJS from "crypto-js";
import RewardHistory from './RewardHistory';
import { useNavigate } from 'react-router-dom';


function CommonModal({ showModal, toggle, spinnerValue, flagData, rewardDesc, benefit, spinnerValues, msisdn, parentMsisdn }) {
  const [loading, setLoading] = useState(false);
  const [appToWeb, setappToWeb] = useState();
  // const [rewardFlag, setRewardFlag] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("message", function (data) {
        setappToWeb(data.data);
    });
  }, [appToWeb])

  let data = spinnerValues?.map((item) => item?.benefit_id)
  let newArr = data?.filter((item) => item !== null)

  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(newArr), 'VE1LLVNFRUQtRU5DLURFQw==').toString();
  let encodeToken = encodeURIComponent(cipherText);


  const claimReaward = () => {
    // setRewardFlag(true);
    // const obj1 = Object.assign({}, newArr);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(encodeToken);
      // window.ReactNativeWebView.postMessage(JSON.stringify(obj1));
      // window.ReactNativeWebView.postMessage(benefit[0]?.props?.children?.props?.children)
    }
    navigate("/RewardHistory")
  }

  const AppToWeb = () => {
    setLoading(true);
    // document.addEventListener("message", function (data) {
    //   alert(data.data);
    //   if(data){
    //     setTimeout(() => {
    //       alert(data.data);
    //     }, 3000);
    //   }
    // });
    setLoading(false);
  }
  const btnClick = () => {
    setLoading(true);
    setTimeout(() => {
      alert(appToWeb)
      setLoading(false);
    }, 3000);
  }

  return (
    <div>
        <Modal className='modalWrapper' isOpen={showModal} toggle={toggle} backdrop="static">
      <button onClick={btnClick} id="btn">{!loading ? 'claim reward' : <Loader />}</button>
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
            {msisdn === parentMsisdn ? <p>This will be reflect in your account within 24 hrs</p> :
            <p>This will be reflect in {msisdn}'s account in 24 hrs</p>
            }
          </div>

          {flagData === 0 ? <><div className='backHomeButton' onClick={()=>{AppToWeb();
            claimReaward()}}>
            <p className='text-center text-white p-3 backHomeText'>claim reward</p>
          </div></> : <>
            <div className='backHomeButton'  onClick={() => navigate(-2)}>
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