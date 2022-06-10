import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, List } from "reactstrap";

function formatDate(date_str){
    const date = new Date(date_str);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = formatMonthShort(date.toLocaleString('default', { month: 'short' }));
    const year = date.toLocaleString('default', { year: 'numeric' });

    return (`${month} ${day}, ${year}`)
}

function formatMonthShort(month_str){
    let month = month_str.length>3 ? month_str.slice(0, 3) : month_str;
    return month.charAt(0).toUpperCase() + month.toLowerCase().slice(1);
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderDish(dish) {
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(comments) {
    if (comments.length === 0) {
      return <div></div>;
    } else {
      return (
        <>
          <h4>Comments</h4>
          <List type="unstyled">
            {comments.map((comment) => (
              <li key={comment.id} className="unstyled">
                <p>{comment.comment}</p>
                <p>
                  -- {comment.author}, {formatDate(comment.date)}
                </p>
              </li>
            ))}
          </List>
        </>
      );
    }
  }

  render() {
    if (this.props.dish === null) {
      return <div></div>;
    } else {
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.props.dish.comments)}
          </div>
        </div>
      );
    }
  }
}

export default DishDetail;
