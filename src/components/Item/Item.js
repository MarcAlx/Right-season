import React, { Component } from 'react';
import "./Item.less"

import PropTypes from 'prop-types';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import i18n from 'i18next';

/**
 * Component mean't to display data about a Fruit or a Vegetable
 */
class Item extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let monthTags = this.props.data.availability.map(
        month=><span className="monthTag" key={month}>{i18n.t("monthIndexes."+month)}</span>
    )
    return (
        <div className="Item">
            <Card className="card">
                <CardMedia
                className="media"
                image={"assets/images/"+this.props.data.image_url}
                title={i18n.t("names."+this.props.data.name)}
                />
                <CardContent className="content">
                    <Typography type="headline" component="h2">
                        {i18n.t("names."+this.props.data.name)}
                    </Typography>
                    <Typography type="headline" component="h2">
                        <div>
                            {monthTags}
                        </div>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button target="_blank" href={this.props.data.url} dense color="primary">
                        {i18n.t("item.urlButtonTitle")}
                    </Button>
                    <Button target="_blank" href={i18n.t("receipProvider.baseURL")+this.props.data.name} dense color="primary">
                        {i18n.t("item.receipButtonTitle")}
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
