import React, { useState,useRef,useCallback  } from 'react';
import { executeModel } from '../api/api';
import '../style/App.css'; // Import CSS file for styling
import pc from '../images/pc.png';
import router from '../images/router.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data2 from '../data/data.json';




const App = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const packetRef = useRef(null);

  const [show, setShow]=useState();

  const [data,setData]=useState(data2)

  const handleChangePredict = useCallback((newValue) => {
    setData(newValue);
  },[data]);


  const startAnimation = () => {
    setIsAnimating(true);
    // Logic to animate packet from point A to point B
    packetRef.current.classList.add('animate');
    predict(data)
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    // Remove the animation class to reset the animation
    packetRef.current.classList.remove('animate');
  };

  const predict = async (pdata) =>{
    try{
      const result = await executeModel({clients:pdata});
      setShow("Predict")
      setData(result.data["packets"])
      console.log(data)
    }catch(e){
      console.log(e)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Software Defined Network</h1>
        <p>Welcome to our SDN platform!</p>
        <p>Revolutionizing the way networks are managed.</p>
      </header>
      <section className="features-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>Centralized Control</h2>
              <p>Manage your entire network from a centralized controller.</p>
            </div>
            <div className="col-md-4">
              <h2>Flexibility</h2>
              <p>Quickly adapt to changing network requirements with ease.</p>
            </div>
            <div className="col-md-4">
              <h2>Automation</h2>
              <p>Automate repetitive tasks and reduce manual configuration.</p>
            </div>
          </div>
        </div>
      </section>
      <main>
        <Container>
          <Row>
            <Col>
              <div className="point-a">
                <img src={pc} alt="PC" className='pc'/>
              </div>
              <div className="line"></div>
              <div className="point-b">
                <img src={router} alt="Router" className='router'/>
              </div>
              <div className="packet" ref={packetRef}></div>
              {!isAnimating ? (
        <button button onClick={startAnimation}>Start</button>
        ) : (
          <button onClick={resetAnimation}>Reset</button>
        )}
            </Col>
          </Row>
          
        </Container>
      </main>
    </div>
  );
};

export default App;
