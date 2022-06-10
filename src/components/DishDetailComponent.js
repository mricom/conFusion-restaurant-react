import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, List } from "reactstrap";

function RenderDish({ dish }) {
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

function RenderComments({ comments }) {
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
                -- {comment.author},{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </li>
          ))}
        </List>
      </>
    );
  }
}

const DishDetail = (props) => {
  if (props.dish === null) {
    return <div></div>;
  } else {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
};

export default DishDetail;
