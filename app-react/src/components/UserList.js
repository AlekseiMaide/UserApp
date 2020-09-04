import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { TableSortLabel } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UserList(props) {
  const classes = useStyles();

  const { users, orderBy, deleteUser, sortUsers } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel direction={orderBy["firstName"]} fieldname={"firstName"} onClick={sortUsers}>
                First name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel direction={orderBy["lastName"]} fieldname={"lastName"} onClick={sortUsers}>
                Last name
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel direction={orderBy["email"]} fieldname={"email"} onClick={sortUsers}>
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel direction={orderBy["dob"]} fieldname={"dob"} onClick={sortUsers}>
                Date of birth
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel direction={orderBy["address"]} fieldname={"address"} onClick={sortUsers}>
                Address
              </TableSortLabel>
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.dob}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
              <TableCell align="right">
                <DeleteForeverOutlinedIcon userid={user.id} onClick={deleteUser} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}