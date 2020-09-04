import React from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';

import UserList from './UserList';
import PageWrapper from './PageWrapper';
import FullWidthGrid from './FullWidthGrid';
import { Button, Link, Grid, Box } from '@material-ui/core';
import UserSearch from './UserSearch';

class UserListView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            orderBy: {
                firstName: "asc",
                lastName: "asc",
                email: "asc",
                dob: "asc",
                address: "asc"
            },
            sortOrder: []
        };

        this.fetchUsers();

        this.fetchUsers = this.fetchUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.sortUsers = this.sortUsers.bind(this);
    }

    fetchUsers() {
        fetch("http://localhost:8080/user?" + this.buildOrderByClause(), {
            // process.env.REST_API_URL + resource, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            cache: "default"
        })
            .then(response => response.json())
            .then(response => this.setState({ users: response.collection }));
    }

    deleteUser(event) {
        const userId = event.currentTarget.getAttribute("userid");

        fetch("http://localhost:8080/user/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            cache: "default",
        }).then(this.fetchUsers);
    }

    sortUsers(event) {
        const fieldName = event.currentTarget.getAttribute("fieldname");
        let { orderBy, sortOrder } = this.state;

        if (orderBy[fieldName] === "asc") {
            orderBy[fieldName] = "desc";
            sortOrder = sortOrder.filter(v => v !== fieldName + ":asc");
            sortOrder.unshift(fieldName + ":desc");
        } else {
            orderBy[fieldName] = "asc";
            sortOrder = sortOrder.filter(v => v !== fieldName + ":desc");
            sortOrder.unshift(fieldName + ":asc");
        }

        this.setState({ orderBy, sortOrder }, this.fetchUsers);
    }

    buildOrderByClause() {
        const { sortOrder } = this.state;
        const sortString = sortOrder.join(",");

        return sortString ? "orderBy=" + sortString : "";
    }

    render() {
        const { users, orderBy } = this.state;

        return (
            <PageWrapper mainContent={
                <FullWidthGrid mainContent={
                    <React.Fragment>
                        <Grid item xs={3}>
                            <UserSearch />
                        </Grid>
                        <Box mt={2} mb={2}>
                            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                <Link component={RouterLink} to="/user/edit" color="inherit">
                                    <Button variant="contained" color="primary">
                                        CREATE USER
                            </Button>
                                </Link>
                            </Grid>
                        </Box>
                        <UserList
                            users={users}
                            orderBy={orderBy}
                            deleteUser={this.deleteUser}
                            fetchUsers={this.fetchUsers}
                            sortUsers={this.sortUsers}
                        />
                    </React.Fragment>
                } />
            } />
        );
    }
}

export default withRouter(UserListView);
