import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const My404Component = () => (
  <div id="page-not-found">
    <MDBContainer>
      <MDBRow>
        <MDBCol size="12" className="text-center">
          <h3>404</h3> Page not found
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </div>
);

export default My404Component;
