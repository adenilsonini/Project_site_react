import React, { Component } from "react";

import { Modal, Button } from "react-bootstrap";

import api from "../../services/api";

import { alertService } from "../../Componets/Alerts";



class SignUp extends Component {

  state = {
    Id: '',
    username: "",
    email: "",
    password: "",
    error: "",
    isOpen: false,
    isUpdate: false,
    Items: []
  }


 componentDidMount() {
    this.Getall();
  }


  async Getall() {
    await api.get("/CadUser")
    .then(res => {
      console.log(res.data);
      this.setState({
        Items: res.data
      })
  })
  .catch((err) => {
      console.log(err);
      alertService.error(err,  {timer: '6000'})
  });
  }

  async Getall() {
    await api.get("/CadUser")
    .then(res => {
      console.log(res.data);
      this.setState({
        Items: res.data
      })
  })
  .catch((err) => {
      console.log(err);
      alertService.error(err,  {timer: '6000'})
  });
  }
  
  async delete(data) {
    await api.delete(`/CadUser/${data.id}`)
    .then(res => {
      console.log(res.data);
      alertService.success(res.data,  {timer: '6000'})
      this.Getall();
  })
  .catch((err) => {
      console.log(err);
      alertService.error(err,  {timer: '6000'})
  });
  }

  async Update(data) {

    if (this.validar_campo() === true){
      return null;
    }
    
    await api.put(`/CadUser/${data.Id}`, data)
    .then(res => {
      console.log(res.data);
      alertService.success(res.data,  {timer: '6000'})

      this.Getall();

      this.closeModal();
  })
  .catch((err) => {
      console.log(err);
      alertService.error(err,  {timer: '6000'})
  });
  }



  handleinputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };


  validar_campo = () => {

        const { username, email, password } = this.state;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;


        if (!username || !password) {
          this.setState({ error: "Preencha o nome de usuario e a senha !" });
          return true;
        }

        if (password.length < 6) {
          this.setState({ error: "A senha deve conter no mínimo 6 caracter !" });
          return true;
        }

        if (password !== document.getElementById("passwordc").value) {
          this.setState({ error: "A senha digita no confirma senha Diferente !" });
          return true;
        }

        if (!email) {
          this.setState({ error: "Preencha o email do usuario !" });
          return true;
        } else if (!regex.test(email)) {
          this.setState({ error: "e-mail digitado invalido !!!" });
          return true;
        }
        return false;
  }

  async handleSignUp() {
   // e.preventDefault();

      const { username, email, password } = this.state;

     if (this.validar_campo() === true){
       return null;
     }
      
      //Rotina abaixo chama a API para salvar as informações no banco de dados
     
      await api.post("/CadUser", { username, email, password })
            .then(res => {
            console.log(res.data);
            
            alertService.success('Registro salvo com Sucesso!',  {timer: '6000'})
           
            this.Getall();

            this.closeModal();

      })
      .catch((err) => {
          console.log(err);
          alertService.error(err,  {timer: '6000'})
      });
  }


  fetchDetails = (data) => {

    this.setState({Id: data.id, username: data.userName, email: data.email, password: data.password})
     
    this.openModal(true);
  }

  //Rotina abaixo para abrir e fechar modal
 openModal = (ispdate) => { this.setState({ isOpen: true, isUpdate: ispdate }); }

 closeModal = () => this.setState({ isOpen: false, Id: null, email: null, username: null, password: null, error: null });






  render() {

    return (

      <>

        <Modal show={this.state.isOpen} scrollable={true} onHide={this.closeModal} keyboard={false} backdrop="static">

          <Modal.Header style={{ backgroundColor: '#836FFF' }} closeButton>
            <Modal.Title style={{ color: 'white' }}>Tela cadastro usuario</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <form onSubmit={this.handleSignUp}>

              {this.state.error && <div className="alert alert-danger" style={{ border: '2px solid red' }} role="alert">
                <strong>Erro:</strong> {this.state.error}</div>}
               
              {this.state.isUpdate &&
                <div className="form-Group" style={{width: '100px'}}>
                  <label>Id</label>
                  <input type="text" className="form-control" disabled name="Id" value={this.state.Id} placeholder="Informe o nome do usuario" onChange={this.handleinputChange} />
                </div>
              }

              <div className="form-Group">
                <label>Nome Usuario</label>
                <input type="text" className="form-control" name="username" value={this.state.username} placeholder="Informe o nome do usuario" onChange={this.handleinputChange} />
              </div>
             
              <div className="form-Group">
                <label>E-mail</label>
                <input type="email" className="form-control" name="email" value={this.state.email} placeholder="Informe o e-mail" onChange={this.handleinputChange} />
              </div>

              <div className="row">
                <div className="col-md 6">
                  <label>Senha</label>
                  <input type="password" className="form-control" name="password" value={this.state.password} placeholder="Informe a senha" onChange={this.handleinputChange} />
                </div>
                <div className="col-md 6">
                  <label>Confirma Senha</label>
                  <input type="password" className="form-control" id="passwordc" name="passwordc" placeholder="Confirme a senha" />
                </div>

              </div>

            </form>

          </Modal.Body>

          <Modal.Footer style={{ backgroundColor: '#DCDCDC' }}>

         
        <div className="row">
          {this.state.isUpdate === false ?
              <div className="col-md 4">
                <button className="btn btn-primary" style={{ width: 150, marginTop: 10 }} type="submit" onClick={() => this.handleSignUp()}>Cadastrar usuario</button>
              </div>

              : 

              <div className="col-md 4">
                <button className="btn btn-primary" style={{ width: 150, marginTop: 10 }} onClick={() => this.Update(this.state)}>Alterar usuario</button>
              </div>
          }
              

              <div className="col-md 4" style={{ textAlign: "right" }}>
                <button className="btn btn-danger" style={{ width: 150, marginTop: 10 }} onClick={() => this.closeModal()}>Cancelar</button>
              </div>

            </div>
          </Modal.Footer>

        </Modal>


        <div className="container text-center">
          <div className="row">
            <div className="col-sm 11">
              <h2>Lista de usuario cadastrados Abaixo</h2>
            </div>
            <div className="col-sm 1" style={{ textAlign: "right", marginTop: "5px" }}>
              <button type="button" className="btn btn-primary" onClick={() => this.openModal(false)}> Adicionar usuario </button>
            </div>
          </div>
        </div>

        <div className="container">

          <table className="table table-bordered table-hover table-sm" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
            <thead className="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Comandos</th>
              </tr>
            </thead>
            <tbody>


              {
                this.state.Items.map(data => {
                  return (
                    <tr key={data.id}>

                      <td>{data.id}</td>
                      <td>{data.userName}</td>
                      <td>{data.email}</td>
                      <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-outline-primary" onClick={() => this.fetchDetails(data)}> Details </button>
                          <button type="button" style={{marginLeft: '5px'}} className="btn btn-outline-danger"  onClick={() => {if (window.confirm('Deseja realmente deletar o registro ?')) this.delete(data)}}> Excluir </button>
                        </div>
                      </td>


                    </tr>
                  );
                })
              }

            </tbody>
          </table>

        </div>


      </>


    );

  }
}

export default SignUp;