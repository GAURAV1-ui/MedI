import classes from './Card1.module.css';

const Card1 = props => {
  return <div className={classes.card1}>{props.children}</div>
};

export default Card1;