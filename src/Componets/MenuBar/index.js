import React, { useState } from "react";
import { Navbar, Nav, Form, Button, FormControl, NavDropdown  } from "react-bootstrap";


const MenuBar = () => {

  return (
      <>
       <div className="container">
           <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/Login">Login</Nav.Link>
                    <Nav.Link href="/Cad_user">Cadastro Usuario</Nav.Link>

                    <NavDropdown title="Menu" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/teste">Teste</NavDropdown.Item>
                        <NavDropdown.Item href="/Upload_img">Upload Imagem</NavDropdown.Item>
                        <NavDropdown.Item href="/Upload_teste">Upload teste mult</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>

            </div>
      </>
  )};

export default MenuBar