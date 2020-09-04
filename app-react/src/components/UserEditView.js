import React from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';

import PageWrapper from './PageWrapper';
import { TextField, Typography, Divider, Button } from '@material-ui/core';
import CenteredGrid from './CenteredGrid';

class UserEditView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            dob: "",
            email: "",
            address: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormSubmitResponse = this.handleFormSubmitResponse.bind(this);
    }

    handleSubmit(event) {
        const { firstName, lastName, dob, email, address } = this.state;

        fetch(
            "http://localhost:8080/user", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    firstName,
                    lastName,
                    dob,
                    email,
                    address,
                    errors: {},
                    errorMessage: null
                })
            }
        )
        .then(response => response.json())
        .then(this.handleFormSubmitResponse)
    }

    handleFormSubmitResponse(json) {
        if (json.hasOwnProperty("debugMessage") && json.debugMessage !== "undefined") {
            this.setState({
                errorMessage: json.message,
                errors: json.subErrors
            });
        } else {
            const { history } = this.props;
            history.push("/");
        }
    }

    handleChange(event) {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        });
    }

    shouldShowError(fieldName) {
        const { errors } = this.state;

        if (errors == null || errors == "undefined") {
            return false;
        }

        let hasError = false;

        errors.forEach(error => {
            if (error.hasOwnProperty("field") && error.field == fieldName) {
                hasError = true;
                return;
            }
        })

        return hasError;
    }

    getErrorMessage(fieldName) {
        const { errors } = this.state;

        if (errors == null || errors == "undefined") {
            return false;
        }

        let message = false;

        errors.forEach(error => {
            if (error.hasOwnProperty("field") && error.field == fieldName) {
                message = error.message;
                return;
            }
        })

        return message;
    }

    render() {
        const { firstName, lastName, dob, email, address, errors, errorMessage } = this.state;

        return (
            <PageWrapper mainContent={
                <CenteredGrid mainContent={
                    <React.Fragment>
                        <Typography align="center" gutterBottom variant="h4">
                            Create User
                        </Typography>

                        <Divider variant="middle" />

                        <Typography color="error" variant="h6">
                            {errorMessage}
                        </Typography>

                        <TextField
                            margin="dense"
                            id="firstName"
                            label="First name"
                            type="text"
                            fullWidth
                            error={this.shouldShowError("firstName")}
                            helperText={this.getErrorMessage("firstName")}
                            value={firstName}
                            onChange={this.handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="lastName"
                            label="Last name"
                            type="text"
                            fullWidth
                            value={lastName}
                            error={this.shouldShowError("lastName")}
                            helperText={this.getErrorMessage("lastName")}
                            onChange={this.handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            type="text"
                            fullWidth
                            value={email}
                            error={this.shouldShowError("email")}
                            helperText={this.getErrorMessage("email")}
                            onChange={this.handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="dob"
                            label="Date of Birth (1980-12-30)"
                            type="text"
                            fullWidth
                            value={dob}
                            error={this.shouldShowError("dob")}
                            helperText={this.getErrorMessage("dob")}
                            onChange={this.handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="address"
                            label="Address"
                            type="text"
                            fullWidth
                            value={address}
                            error={this.shouldShowError("address")}
                            helperText={this.getErrorMessage("address")}
                            onChange={this.handleChange}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </Button>
                    </React.Fragment>
                } />
            } />
        );
    }
}

export default withRouter(UserEditView);
