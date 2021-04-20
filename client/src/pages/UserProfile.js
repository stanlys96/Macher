import React from 'react';
import Style from "style-it";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    padding: '15px'
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function UserProfile() {
  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return Style.it(`
      .homeBackground {
        background-color: rgba(0, 0, 0, 0.7);
        height: 92.5vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .homeBackground::before {
        content: '';
        position: absolute;
        top: 7.5vh;
        left: 0;
        height: 92.5vh;
        width: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url('/background.jpeg');
        z-index: -1;
      }
    `,
    <div className="homeBackground">
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="/person.png"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Full Name: {localStorage.getItem('userFullName')}
        </Typography>
        <Typography style={{ marginTop: 10 }} variant="body2" color="textSecondary" component="p">
          Email: {localStorage.getItem('userEmail')}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
    </div>
  )
}

export default UserProfile;