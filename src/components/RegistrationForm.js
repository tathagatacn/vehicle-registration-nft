import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";

class RegistrationForm extends Component {
  mint = (stateCode, regNumber) => {
    if (
      stateCode != "" &&
      regNumber != "" &&
      stateCode >= 1 &&
      stateCode <= 20 &&
      regNumber >= 1111 &&
      regNumber <= 9999
    ) {
      this.props.onMint(stateCode, regNumber);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid registration number",
        icon: "error",
      });
    }
  };

  render() {
    return (
      <>
        <h3>Mint a new Vehicle Registration NFT</h3>
        <div className="row plate-form">
          <div className="col-lg-4 col-md-8 col-12">
            <Card>
              <CardBody>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const stateCode = this.stateCode.value;
                    const regNumber = this.regNumber.value;
                    this.mint(stateCode, regNumber);
                  }}
                >
                  <div className="d-flex row justify-content-around">
                    <div className="col-3 text-center">IN</div>
                    <div className="col-4 text-center">
                      <input
                        className="vr-input"
                        type="number"
                        placeholder="State Code"
                        ref={(input) => (this.stateCode = input)}
                      />
                    </div>
                    <div className="col-1 text-center">-</div>
                    <div className="col-4 text-center">
                      <input
                        className="vr-input"
                        type="number"
                        placeholder="Number"
                        ref={(input) => (this.regNumber = input)}
                      />
                    </div>
                  </div>
                  <div className="d-flex row justify-content-around">
                    <div className="col-4 text-center">
                      <input
                        style={{ margin: "6px" }}
                        type="submit"
                        value="Mint"
                        className="btn btn-primary btn-black"
                      />
                    </div>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </>
    );
  }
}

export default RegistrationForm;
