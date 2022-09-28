import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'

export default class Footer extends Component {
  render() {
    return (
        <div className="fixed-bottom">  
            <Navbar color="dark" dark>
                <NavbarBrand className='m-auto'>&copy; 2022 NFT</NavbarBrand>
            </Navbar>
        </div>
    )
  }
}
