import React, { Component } from "react";
import RegistrationListItem from "./RegistrationListItem";

class RegistrationList extends Component {
  render() {
    const registrations = this.props.registrations;
    return (
      <>
        <h3>NFT Collections</h3>
        <div className="row">
          {registrations.map(function (registration, key) {
            return (
              <RegistrationListItem key={key} registration={registration} />
            );
          })}
        </div>
      </>
    );
  }
}

export default RegistrationList;
