import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/login.png";
import api from "../../services/api";
import { login, logout, getToken } from "../../services/auth";



class Login extends Component {
  state = {
    UserName: "",
    password: "",
    error: "",
    token: getToken()
  };


    sair = () => {
      logout();
      this.setState({token: null});
      alert("Você realizou Logout !")
    }
    
  

  handleSignIn = async e => {
    e.preventDefault();
    const { UserName, password } = this.state;
    if (!UserName || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/login/authenticate", { UserName, password });
      //  alert(response.data.jwtToken);
        login(response.data.token);
        this.props.history.push("/");

      } catch (err) {
        this.setState({
          error: "Houve um problema com o login, verifique suas credenciais. de Acesso !"
        });
      }
    }
  };


  handlePress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleSignIn(e);
    } else if (e.keyCode === 13) {
      e.preventDefault();

    }
  }

  

  render() {
    return (
      <div className="container">
        <div style={{ width: '20%', margin: '0 auto' }}>
          <img src={Logo} alt="Imagem logo" />
        </div>

        {this.state.token == null ?

          <form onSubmit={this.handleSignIn}>

            <div className="row justify-content-center">

              <div className="card border-info">

                <div className="card-header">
                  <h4> Login</h4>
                </div>

                <div className="card-body">

                  {this.state.error && <div className="alert alert-danger" style={{ border: '2px solid red' }} role="alert">{this.state.error}</div>}

                  <div className="form-Group">
                    <label>E-mail</label>
                    <input type="email" className="form-control"  name="email" placeholder="Informe o e-mail" onChange={e => this.setState({ UserName: e.target.value })} />
                  </div>


                  <div className="form-Group">
                    <label>Senha</label>
                    <input type="password" className="form-control" name="password" placeholder="Informe a senha" onKeyDown={this.handlePress} onChange={e => this.setState({ password: e.target.value })} />
                  </div>

                  <div className="row">
                    <div className="col-md 6">
                      <button className="btn btn-primary" style={{ width: 150, marginTop: 10 }} type="submit">Login</button>
                    </div>
                    <div className="col-md 6" style={{ textAlign: "right" }}>
                      <button className="btn btn-danger" style={{ width: 150, marginTop: 10 }} onClick={() => document.location.href = "/"}>Cancelar</button>
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </form>


          : <>
            <h1 style={{ textAlign: "center" }}>Você esta Logando no Sistema.</h1>
            <h3>Para Sair clique no botão abaixo</h3>
            <button className="btn btn-danger" onClick={this.sair}>Realizar Logout</button>
          </>}


      </div>
  );
    
  }
}

export default withRouter(Login);