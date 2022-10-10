import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";

class Reward extends Component {
  getBalance = (address) => {
    if (address != "") {
      this.props.getBalance(address);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid address",
        icon: "error",
      });
    }
  };
  distributeReward = () => {
    this.props.distributeReward();
  }
  render() {
    const balance = this.props.balance;
    return (
      <>
        <h3>MOT Token Reward Console</h3>
        <div className="row plate-form">
          <div className="col-lg-4 col-md-8 col-12">
            <Card>
              <CardBody>
                {/* <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const address = this.address.value;
                    this.getBalance(address);
                  }}
                >
                  <div className="d-flex row justify-content-around">
                    <div className="col-8 text-center">
                      <input
                        className="vr-input fw-input"
                        type="text"
                        placeholder="Address"
                        ref={(input) => (this.address = input)}
                      />
                    </div>
                    <div className="col-4 text-center">
                      <input
                        type="submit"
                        value="Get Balance"
                        className="btn btn-primary btn-black btn-get-balance"
                      />
                    </div>
                  </div>
                </form> */}
                <div className="d-flex row justify-content-around">
                  <div className="col-12 text-center">
                    Balance: {balance}
                  </div>
                </div>
                <div className="d-flex row justify-content-around">
                  <input
                    type="submit"
                    value="Distribute Rewards"
                    className="btn btn-primary btn-black"
                    onClick={this.distributeReward}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </>
    );
  }
}

export default Reward;
