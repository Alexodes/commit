import React from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';

const UserStyles = styled.div`
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 3px;
  padding: 15px;
  font-family: Helvetica, sans-serif;
  max-width: 300px;
`;


function User({form}) {
    return (
        <UserStyles>
            <p><strong>User Name:</strong> {form.name}</p>
            <p><strong>Phone Number:</strong> {form.phone}</p>
        </UserStyles>
    )
}

const mapStateToProps = state => {
    return {form: state.formSubmitReducer};
}

export default connect(mapStateToProps)(User);
