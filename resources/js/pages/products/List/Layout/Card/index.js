import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardActions, CardContent, Typography, Checkbox, FormControlLabel } from '@material-ui/core/';
import Aviability from '../Aviability'
import useStyles from './styles';
import ProgresiveImage from '~c/common/ProgresiveImage';
import ActionsButtons from '../ActionsButtons'

const ProductCard = ({ id, checked, title, article, available, description, price, images, onSelect }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card className={classes.card} variant="outlined">
                <CardContent >
                    <div>
                        <FormControlLabel
                            label={title}
                            className={classes.cardTitle}
                            control={
                                <Checkbox checked={checked} onChange={onSelect} color="secondary" />
                            }
                        />
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <b>${price}</b> Article: {article}
                    </Typography>
                </CardContent>
                {images != null && (<ProgresiveImage alt={title} title={title} {...images[0]} />)}
                <CardContent className={classes.cardContent}>
                    <Aviability size="small" variant="default" available={available} />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className={classes.cardDescription}
                    >
                        {description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <ActionsButtons id={id} />
                </CardActions>
            </Card>
        </Grid>
    );
}

ProductCard.propTypes = {
    checked: PropTypes.bool,
    title: PropTypes.string.isRequired,
    article: PropTypes.string,
    available: PropTypes.number,
    price: PropTypes.number,
    description: PropTypes.string,
    thumbnail: PropTypes.object,
    onSelect: PropTypes.func,
};

ProductCard.defaultProps = {
    onSelect: () => { },
};

export default ProductCard;