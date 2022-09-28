import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";

class RegistrationListItem extends Component {
  render() {
    const r = this.props.registration;
    const stateCode = ('00'+r.stateCode).slice(-2);
    const regNumber = ('0000'+r.number).slice(-4);
    let color = '';
    if (r.stateCode == 0 && r.number == 0) {
        color = 'golden';
    }
    return (
      <div className="col-lg-4 col-md-6 col-12">
        <Card>
          <CardBody>
            <div className="plate-container d-flex flex-row">
              <div className="plate-badge col-2">
                <img src="badge.png" alt="badge" />
              </div>
              <div className={"plate-color col-2 " + color}>IN</div>
              <div className="plate-number col">
                { stateCode } - { regNumber }
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default RegistrationListItem;
