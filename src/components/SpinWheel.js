import React, { useState, useEffect } from 'react'
import './Styles.css'
import { Container } from "reactstrap";
import infoIcon from '../Assets/images/Icon_Info.svg'
import backIcon from '../Assets/images/Icon_Back.svg'
import { Link } from "react-router-dom";
import CommonModal from './CommonModal';
import HowToPlayModal from './HowToPlayModal';
import { getRequestData } from '../services/RequestHandler';
import { route } from '../services/ApiRoutes';
import myntraImage from '../Assets/images/Myntra@2x.png'
import viImage from '../Assets/images/Vi .svg'
import sonyLive from '../Assets/images/Sony LIV@2x.png'
import nuaImage from '../Assets/images/Nua@2x.png'
import spinArrowImage from '../Assets/images/pointer.svg'
import axios from 'axios';

function SpinWheel() {

  const [showModal, setModal] = useState(false);
  const [howToPlayModal, setHowToPlayModal] = useState(false)
  const [spinValue, setSpinValue] = useState()
  const [name, setName] = useState('circle')
  const [spinnerValue, setSpinnerValue] = useState(null)

  let timer;
  const spinWheelWin = () => {
    let spinData = document.getElementById('spinArrow');
    const spinDatas = spinData.getBoundingClientRect()
    const leftPosition = spinDatas.left + (spinDatas.width / 2)
    console.log('objectres', leftPosition)
    const arrayData = [
      {
        "State": "Flat 100 off*",
        "image": myntraImage
      },
      {
        "State": "₹ 150 gift voucher",
        "image": nuaImage
      },
      {
        "State": "30% off max ₹100",
        "image": myntraImage
      },
      {
        "State": "1 GB data for 1 day",
        "image": viImage
      },
      {
        "State": "28 days subscription",
        "image": sonyLive
      },
      {
        "State": "5GB data for 7 days",
        "image": viImage
      },
    ]
    let topData = Infinity
    let indexData = 0
    let topArray = [];
    arrayData.map((item, index) => {
      let arrowData = document.getElementById(`spinId_${index}`)
      const arrowDatas = arrowData.getBoundingClientRect()
      if (arrowDatas.top < topData) {
        topData = arrowDatas.top
        indexData = index + 1
      }
      console.log('objectres', indexData)
      topArray.push({index: index, value: arrowDatas?.top});
      console.log('left', arrowDatas.left, arrowDatas.right, arrowDatas.top, index + 1)
    })
    topArray.sort((a,b) => a.value - b.value);
    let winner = topArray[0];
    console.log("Winner", winner.value, arrayValue.state);
    setSpinnerValue(arrayValue[winner?.index]?.State, indexData)
    setTimeout(() => {
      toggle();
    }, 1000);
    console.log('topData', indexData)
  }

  const startRotation = () => {
    setName('circle start-rotate')
    timer = setTimeout(() => {
      setName('circle start-rotate stop-rotate')
      setTimeout(() => {
        spinWheelWin();
      }, 1000)
    }, Math.floor(Math.random() * 4000) + 1);
  }

  useEffect(() => {
    spinWheelApi()
    return()=> {
      clearTimeout(timer);
 }
  }, []);

  const toggle = () => {
    setModal(!showModal)
    // if(!showModal){
    //   play()
    // }
    // setHowToPlayModal(!howToPlayModal)
  }

  function play() {
    var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
    audio.play();
  }

  const playtoggle = () => {
    setHowToPlayModal(!howToPlayModal)
  }

  const spinWheelApi = async () => {
    const response = await getRequestData(route["GET_SPIN"]);
    console.log('objectfd', response?.data?.SpinWheelCouponData)
    const spinData = response?.data?.SpinWheelCouponData.map((item) => {
      return(
        <>
        <p>{item}</p>
        </>
      )
    })
    setSpinValue(response?.data?.SpinWheelCouponData)
  }
  console.log('object',spinValue)

  const arrayValue = [
    {
      "State": "Flat 100 off*",
      "image": myntraImage
    },
    {
      "State": "₹ 150 gift voucher",
      "image": nuaImage
    },
    {
      "State": "30% off max ₹100",
      "image": myntraImage
    },
    {
      "State": "1 GB data for 1 day",
      "image": viImage
    },
    {
      "State": "28 days subscription",
      "image": sonyLive
    },
    {
      "State": "5GB data for 7 days",
      "image": viImage
    },
  ]


  return (
    <>
      <Container>
        <div className='wrapper'>
        <div className='spinToWinHeader'>
          <img src={backIcon} height={25} className="backIconImage" />
          <p className='spinToWinHeaderText'>spin to win</p>
        </div>
        <div  >
          <div className='arrow' id="spinArrow" >
            <img src={spinArrowImage}/>
          </div>
          <div className='circleBorder'>
          <div className={name} >
            {spinValue?.map((item, index) =>
            (<ul spellCheck='false' id={`spinId_${index}`} key={item} >
              <div className='contantBox'>
                <div>
                <img src={item?.image} height={30} width={30}/>
                </div>
                <div className='textBox'>
                {item?.description}
                </div>
              </div>
            </ul>)
            )}
          </div>
          <div className='spin-button' onClick={startRotation}>
            <p className='spinBtnText text-center' >SPIN</p>
          </div>
          </div>
        </div>
        <div className='infoIcon'>
          <div className='infoIconWrapper'>
            <img src={infoIcon} height={20} />
          </div>
          <p><span className='pleaseNoteText'>Please Note - </span> Spin the wheel only once every 48 hours. To spin the wheel again, recharge after 48 hours.</p>
        </div>
        </div>
      </Container>
      <Container>
        <div onClick={(event) => {
          event.preventDefault();
          // toggle();
          // playModal()
          playtoggle();
        }}>
          <a href='' className='howToPlayText'>how to play</a>
        </div>
        <hr />
        <Link to="rewardHistory" className='howToPlayText'>reward history</Link>
      </Container>
      <CommonModal showModal={showModal} toggle={toggle} spinnerValue={spinnerValue} />
      <HowToPlayModal howToPlayModal={howToPlayModal} toggle={playtoggle} />
    </>
  )
}

export default SpinWheel
