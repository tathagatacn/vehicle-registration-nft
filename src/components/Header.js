import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'

export default class Header extends Component {
  render() {
    return (
      <Navbar color='dark' dark fixed='top'>
        <NavbarBrand className='m-auto'>Vehicle Registration NFT Marketplace</NavbarBrand>
      </Navbar>
    )
  }
}
