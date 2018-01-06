import React, { Component } from 'react';
import "./Item.less"

import PropTypes from 'prop-types';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import * as config from '../../Config';

/**
 * Component mean't to display data about a Fruit or a Vegetable
 */
class Item extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let monthTags = this.props.data.month.map(
        month=><span className="monthTag" key={month}>{config.indexToMonth[month]}</span>
    )
    return (
        <div className="Item">
            <Card className="card">
                <CardMedia
                className="media"
                image={this.props.data.image}
                title={this.props.data.name}
                />
                <CardContent>
                    <Typography type="headline" component="h2">
                        {this.props.data.name}
                    </Typography>
                    <Typography type="headline" component="h2">
                        <div>
                            {monthTags}
                        </div>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button target="_blank" href={this.props.data.url} dense color="primary">
                        Wikipédia
                    </Button>
                    <Button target="_blank" href={config.recipeBaseURL+this.props.data.name} dense color="primary">
                        Recettes
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
  }
}

Item.propTypes={
    data:PropTypes.object
};

export default Item;
