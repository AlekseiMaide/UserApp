import React from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

class UserListView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            searchField: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        const { searchField } = this.state;

        fetch("http://localhost:8080/user?searchName=" + searchField, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            cache: "default"
        }
        )
            .then(response => response.json())
            .then(response => this.setState({ suggestions: response.collection }))
            .catch(console.log);
    }

    handleChange(event) {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        }, this.search);
    }

    render() {
        const { suggestions, searchField } = this.state;

        return (
            <React.Fragment>
                <Autocomplete
                    id="searchField"
                    options={suggestions}
                    getOptionLabel={(option) => option.firstName + " " + option.lastName}
                    style={{ width: 300 }}
                    inputValue={searchField}
                    renderInput={(params) => (
                        <TextField 
                            autoFocus
                            margin="dense"
                            label="Search"
                            value={searchField}
                            onChange={this.handleChange}
                            fullWidth
                            {...params}
                        />)
                    }
                />
            </React.Fragment>
        );
    }
}

export default withRouter(UserListView);
