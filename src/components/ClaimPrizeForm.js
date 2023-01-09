
import React, { useState } from "react";
import { Button, Container } from 'reactstrap';
import backIcon from '../Assets/images/Icon_Back.svg'
import { useNavigate } from 'react-router-dom';
import './Styles.css'
import Webcam from "react-webcam";


function ClaimPrizeForm() {
    const [file, setFile] = useState();
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const navigate = useNavigate();

    return (
        <Container>
            <div className='spinToWinHeader'>
                <img src={backIcon} height={25} className="backIconImage" onClick={() => navigate(-1)} />
                <p className='spinToWinHeaderText'>submit form to claim prize!</p>
            </div>
            <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
            <div className="mb-2">
                <label >name *</label>
                <input placeholder="enter name" type="text" className="nameInput"/>
                <label >email *</label>
                <input placeholder="enter email" type="email" className="nameInput"/>
                <label >mobile number *</label>
                <input placeholder="enter mobile number" type="number" className="nameInput"/>
                <label >address *</label>
                <input placeholder="enter address" maxLength={500} type="textarea" className="nameInput"/>
                <label >pincode *</label>
                <input placeholder="enter pincode" type="number" className="nameInput"/>
                <label >landmark *</label>
                <input placeholder="enter landmark" type="text" className="nameInput"/>
                <Button>submit form</Button>
            </div>
            <div className="App">
                <input type="file" onChange={handleChange} />
                <img src={file} />
            </div>
        </Container>

    );
}

export default ClaimPrizeForm;


// import React, { useEffect, useRef } from "react";
// import Webcam from "react-webcam";

// const videoConstraints = {
//   width: 540,
//   facingMode: "environment"
// };

// const ClaimPrizeForm = () => {
//   const webcamRef = useRef(null);
//   const [url, setUrl] = React.useState(null);

//   const capturePhoto = React.useCallback(async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setUrl(imageSrc);
//   }, [webcamRef]);

//   const onUserMedia = (e) => {
//     console.log(e);
//   };

//   return (
//     <>
//       <Webcam
//         ref={webcamRef}
//         audio={true}
//         screenshotFormat="image/jpeg"
//         videoConstraints={videoConstraints}
//         onUserMedia={onUserMedia}
//       />
//       <button onClick={capturePhoto}>Capture</button>
//       <button onClick={() => setUrl(null)}>Refresh</button>
//       {url && (
//         <div>
//           <img src={url} alt="Screenshot" />
//         </div>
//       )}
//     </>
//   );
// };

// export default ClaimPrizeForm;
