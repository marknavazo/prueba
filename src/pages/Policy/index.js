import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import * as ROUTES from '../../constants/routes';
import Help from './Help';
import PrivacyPolicy from './PrivacyPolicy';

const PolicyPage = () => (
  <div id="policy">
    <MDBContainer className="margin_bottom">
      <MDBRow>
        <MDBCol size="12">
          <Switch>
            <Route exact path={ROUTES.HELP} component={Help} />
            <Route
              exact
              path={ROUTES.PRIVACY_POLICY}
              component={PrivacyPolicy}
            />
          </Switch>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </div>
);

export default PolicyPage;
