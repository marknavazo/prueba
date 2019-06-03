import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import ScrollableAnchor from 'react-scrollable-anchor';
import Loading from '../../components/Loading';
import SignInGoogle from '../../components/SignIn/SignInGoogle';
import SignInFacebook from '../../components/SignIn/SignInFacebook';
import SignInTwitter from '../../components/SignIn/SignInTwitter';
import GLOBAL from '../../constants/global';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    document.title = `${GLOBAL.TITLE}`;
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div className="landing__container" id="landing-page">
        <div className="landing__section1" id="landing-section1">
          <ScrollableAnchor id="section1">
            <div> &nbsp; </div>
          </ScrollableAnchor>
          <div className="landing__section1-bkg" />
          <MDBContainer>
            <MDBRow>
              <MDBCol
                xl="9"
                lg="8"
                md="12"
                className="text-xl-left text-lg-left text-md-center"
              >
                <h2>{`${GLOBAL.TITLE}`}: </h2>
                <h3>Prueba técnica</h3>
              </MDBCol>
              <MDBCol xl="3" lg="4" md="12">
                <div className="continue text-center">
                  <b>INICIAR SESIÓN</b>
                </div>
                <SignInGoogle />
                <SignInFacebook />
                <SignInTwitter />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol size="12">
                <div className="element">
                  <a href="#section2">
                    <i className="fal fa-arrow-square-down" />
                  </a>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
        <div className="landing__section2" id="landing-section2">
          <ScrollableAnchor id="section2">
            <div> &nbsp; </div>
          </ScrollableAnchor>
          <div className="landing__section2-bkg" />
          <MDBContainer>
            <MDBRow>
              <MDBCol size="12 text-center mb50">
                <h2>Tecnologías</h2>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol size="3">
                <i className="fab fa-react" />
                <h3>React</h3>
              </MDBCol>
              <MDBCol size="3">
                <i className="fab fa-html5" />
                <h3>HTML5</h3>
              </MDBCol>
              <MDBCol size="3">
                <i className="fab fa-css3-alt" />
                <h3>CSS3</h3>
              </MDBCol>
              <MDBCol size="3">
                <i className="fab fa-bootstrap" />
                <h3>Bootstrap</h3>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol size="12">
                <div className="element">
                  <a href="#section3">
                    <i className="fal fa-arrow-square-down" />
                  </a>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
        <div className="landing__section3" id="landing-section3">
          <ScrollableAnchor id="section3">
            <div> &nbsp; </div>
          </ScrollableAnchor>
          <div className="landing__section3-bkg" />
          <MDBContainer>
            <MDBRow>
              <MDBCol size="12">
                <div className="video__responsive">
                  <iframe
                    title="Video"
                    src="https://www.youtube.com/embed/0NMDa37mM5c"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol size="12">
                <div className="element mb50">
                  <a href="#section1">
                    <i className="fal fa-arrow-square-up" />
                  </a>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default Landing;
