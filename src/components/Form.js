import React from "react";
import { submitForm } from "../actions/index";
import { connect } from "react-redux";
import styled from "styled-components";

const FormsStyles = styled.form`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  .form-item-container {
    margin-bottom: 15px;
  }
  .form-item {
    position: relative;
    border: 1px solid rgba(0, 0, 0, .2);
    padding: 20px 40px 20px 10px;
    border-radius: 3px;
    margin-bottom: 5px;
  }
  .form-item__label {
    position: absolute;
    font-size: .8rem;
    font-family: sans-serif;
    color: #727272;
    top: -8px;
    background-color: #fff;
    padding: 0 3px;
  }
  .form-item__input {
    border: none;
    font-size: 1rem;
  }
  .form-item__input:focus {
    border: none;
    outline: none;
  }
  .form-submit {
    color: #fff;
    background-color: #0d6efd;
    border: none;
    border-radius: 3px;
    text-transform: uppercase;
    font-size: 1rem;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color .2s ease;
    margin-bottom: 20px;
  }
  .form-submit:hover {
    background-color: #0b5ed7;
  }
  .form-item__error {
    font-family: sans-serif;
    color: #dc3545;
    font-size: .8rem;
    margin-bottom: 5px;
  }
  .success-message {
    font-family: sans-serif;
    color: #198754;
    font-size: .8rem;
  }
`;

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        name: '',
        phone: '',
        password: '',
        confirm: '',
        errors: {},
        successMessage: ''
    }

    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        });
    }

    handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        if(!this.state.password) {
            formIsValid = false;
            errors["passwordEmpty"] = "Please, enter the password";
        }

        if(this.state.password) {
            if(this.state.password.length < 6 || this.state.password.length > 12) {
                formIsValid = false;
                errors["passwordRange"] = "The password should include 6-12 characters";
            }

            if(!this.state.password.match(/[A-Z]/)) {
                formIsValid = false;
                errors["passwordUppercase"] = "The password should contain one uppercase letter";
            }

            if(!this.state.password.match(/\W|_/g)) {
                formIsValid = false;
                errors["passwordSpecial"] = "The password should contain one special character";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleSubmit = e => {
        e.preventDefault();
        let errors = {};
        const _this = this;

        if (this.handleValidation()) {
            if(this.state.password.localeCompare(this.state.confirm) == 0) {
                setTimeout(function (){
                    _this.props.submitForm({name: _this.state.name, phone: _this.state.phone});
                    _this.setState({
                        name: '',
                        phone: '',
                        password: '',
                        confirm: '',
                        errors: {},
                        successMessage: "The form was submitted"
                    });
                }, 2000);
            } else {
                errors["confirm"] = "Password don't match";
                this.setState({ errors: errors });
            }
        }
    }


    render(){
        return (
            <FormsStyles onSubmit={this.handleSubmit}>
                <div className="form-item-container">
                    <div className="form-item">
                        <label className="form-item__label" htmlFor="name">User Name</label>
                        <input className="form-item__input" type="text" name="name" value={this.state.name} maxLength={32} onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="form-item-container">
                    <div className="form-item">
                        <label className="form-item__label" htmlFor="phone">Phone Number</label>
                        <input className="form-item__input" type="tel" name="phone" value={this.state.phone} maxLength={10} onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="form-item-container">
                    <div className="form-item">
                        <label className="form-item__label" htmlFor="password">Password</label>
                        <input className="form-item__input" type="password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-item__error">{this.state.errors["passwordEmpty"]}</div>
                    <div className="form-item__error">{this.state.errors["passwordRange"]}</div>
                    <div className="form-item__error">{this.state.errors["passwordUppercase"]}</div>
                    <div className="form-item__error">{this.state.errors["passwordSpecial"]}</div>
                </div>
                <div className="form-item-container">
                    <div className="form-item">
                        <label className="form-item__label" htmlFor="confirm">Confirm Password</label>
                        <input className="form-item__input" type="password" name="confirm" value={this.state.confirm} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-item__error">{this.state.errors["confirm"]}</div>
                </div>
                <input className="form-submit" type="submit" value="submit"/>
                <div className="success-message">{this.state.successMessage}</div>
            </FormsStyles>
        )
    }
}

export default connect(null, {submitForm})(Form);
