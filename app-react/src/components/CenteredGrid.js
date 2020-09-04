import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(8),
    textAlign: 'justify',
    color: theme.palette.text.secondary,
    backgroundColor: '#f7f7f7',
  },
}));

export default function CenteredGrid(props) {
  const classes = useStyles();

  const { mainContent } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
      <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>{mainContent}</Paper>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
    </div>
  );
}
