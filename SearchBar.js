
import React, { useState, Fragment } from 'react';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  main: {
    width:"30%", 
    background:"#F2F1F9", 
    border:"none", 
    position:"relative",
    right:"400px",
    padding:"0.5rem",
    margin: '0 auto',
  },
  searchIcon: {
    height: 30,
    border: "none",
    cursor: "pointer",
  }
};

const SearchBar = ({ setValue, placeholder, classes }) => {
  const [query, setQuery] = useState('');
  
  
  return (
    <Fragment>
      <input 
        value={query}
        placeholder={placeholder}
        onChange={e=>setQuery(e.target.value)}
        className={classes.main}
      />
      {setValue(query)}
     { console.log(query)}
      {console.log(setValue)}
    </Fragment>
  );
}

export default withStyles(styles)(SearchBar);
