import React, { useState,useRef  } from 'react';
import '../style/App.css'; // Import CSS file for styling
import pc from '../images/pc.png';
import router from '../images/router.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const App = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const packetRef = useRef(null);


  const startAnimation = () => {
    setIsAnimating(true);
    // Logic to animate packet from point A to point B
    packetRef.current.classList.add('animate');
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    // Remove the animation class to reset the animation
    packetRef.current.classList.remove('animate');
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
        <div className="space"></div>
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
              {!isAnimating ? (
        <button onClick={startAnimation}>Start</button>
      ) : (
        <button onClick={resetAnimation}>Reset</button>
      )}
              <div className="packet" ref={packetRef}></div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default App;
