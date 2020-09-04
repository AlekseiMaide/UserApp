import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'justify',
    color: theme.palette.text.secondary,
    backgroundColor: '#f7f7f7',
  },
}));

export default function FullWidthGrid(props) {
  const classes = useStyles();

  const { mainContent } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>{mainContent}</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
