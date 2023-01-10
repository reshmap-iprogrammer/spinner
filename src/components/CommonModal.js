import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import infoIcon from '../Assets/images/Icon_Info.svg'
import closeIcon from '../Assets/images/close.svg'
import Loader from './Loader';
import CryptoJS from "crypto-js";
import RewardHistory from './RewardHistory';
import { useNavigate } from 'react-router-dom';


function CommonModal({ showModal, toggle, spinnerValue, flagData, rewardDesc, benefit, spinnerValues, msisdn, parentMsisdn, loading, setLoading }) {
  const [appToWeb, setappToWeb] = useState();
  const [rewardTypeFlag, setrewardTypeFlag] = useState()


  useEffect(() => {
    document.addEventListener("message", function (data) {
        alert(data.data)
      setappToWeb(data.data);
      setLoading(false);
      navigate("/RewardHistory")
    });
  }, [])

  const rewartTypeData = () => {
    setrewardTypeFlag(spinnerValues?.map((item) => {
      return (
        <p>{item.reward_type}</p>
      )
    }))
  }

  const navigate = useNavigate();

  let data = spinnerValues?.map((item) => item?.benefit_id)
  let newArr = data?.filter((item) => item !== null)
  console.log('object', newArr)

  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(newArr), 'SE1LLVNSRUQtRU5DLURFQw==').toString();
  let encodeToken = encodeURIComponent(cipherText);
// alert(JSON.stringify(encodeToken))

  const claimReaward = () => {
    // setRewardFlag(true);
    // const obj1 = Object.assign({}, newArr);
   
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(encodeToken);
    }
    setLoading(true);
    // navigate("/RewardHistory")
  }


  const AppToWeb = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   alert(appToWeb)
    //   setLoading(false);
    // }, 3000);
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
            {msisdn === parentMsisdn ? <p>This will be reflect in your account within 24 hrs</p> :
            <p>This will be reflect in {msisdn}'s account in 24 hrs</p>
            }
          </div>

          {flagData === 0 ? <><div className='backHomeButton' onClick={()=>{AppToWeb();
            claimReaward()}}>
            <p className='text-center text-white p-3 backHomeText'>{!loading ? 'claim reward' : <Loader />}</p>
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