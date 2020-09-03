import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Link, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    img: {
      display: 'block',
      margin: 'auto',
      width: '100%',
      height: 'auto',
    },
    link: {
      wordBreak: 'break-all',
    },
    container: {
      marginTop: theme.spacing(2),
    },
  };
});

function Map({ src, alt }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography>
        URL:{' '}
        <Link className={classes.link} href={src}>
          {src}
        </Link>
      </Typography>
      <img src={src} alt={alt} className={classes.img} />
    </div>
  );
}

Map.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

Map.defaultProps = {
  src: '',
};

export default memo(Map);
