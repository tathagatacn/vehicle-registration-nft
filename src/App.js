import React, { Component } from "react";
import { Container } from "reactstrap";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import VehicleRegistration from "./abis/VehicleRegistration.json";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationList from "./components/RegistrationList";
import "./App.css";
import Swal from "sweetalert2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
      registrations: [],
    };
    this.getAccounts = this.getAccounts.bind(this);
    this.getContract = this.getContract.bind(this);
    this.fetchNFTs = this.fetchNFTs.bind(this);
    this.onMint = this.onMint.bind(this);
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.getAccounts();
    await this.getContract();
  }

  async loadWeb3() {
    const provider = await detectEthereumProvider();
    if (provider) {
      console.log("Etherium wallet is connected");
      window.web3 = new Web3(provider);
    } else {
      console.error("No etherium wallet is detected");
      Swal.fire({
        title: "Error!",
        text: "No etherium wallet is detected! Please connect a Etherium wallet and reload the page!",
        icon: "error",
      });
    }
  }

  async getAccounts() {
    const accounts = await window.web3.eth.getAccounts();
    if (accounts.length > 0) {
      this.setState({ account: accounts[0] });
    } else {
      Swal.fire({
        title: "Error!",
        text: "No etherium wallet is detected! Please connect a Etherium wallet and reload the page!",
        icon: "error",
      });
    }
  }

  async getContract() {
    const networkId = await window.web3.eth.net.getId();
    const networkData = VehicleRegistration.networks[networkId];
    if (networkData) {
      const abi = VehicleRegistration.abi;
      const address = networkData.address;
      const contract = new window.web3.eth.Contract(abi, address);
      this.setState({ contract });
      this.fetchNFTs(contract);
    } else {
      console.error("Failed to connect blockchain");
      Swal.fire({
        title: "Error!",
        text: "Failed to connect blockchain!",
        icon: "error",
      });
    }
  }

  async fetchNFTs(contract) {
    const totalSupply = await contract.methods.totalSupply().call();
    this.setState({ totalSupply });
    console.log("Fetching " + totalSupply + " NFTs");

    this.setState({
      registrations: [],
    });

    for (let i = 1; i <= totalSupply; i++) {
      const registration = await contract.methods.registrations(i - 1).call();
      this.setState({
        registrations: [...this.state.registrations, registration],
      });
    }
  }

  async onMint(stateCode, regNumber) {
    this.state.contract.methods
      .mint(stateCode, regNumber)
      .send({
        from: this.state.account,
      })
      .once("receipt", () => {
        this.fetchNFTs(this.state.contract);
      })
      .catch((err) => {
        console.error(err.message);
        Swal.fire({
          title: "Transaction Failed!",
          text: err.message,
          icon: "error",
        });
      });
  }

  render() {
    return (
      <>
        <Header />
        <Container className="main-container">
          <RegistrationForm onMint={this.onMint} />
          <RegistrationList registrations={this.state.registrations} />
        </Container>
        <Footer />
      </>
    );
  }
}

export default App;
