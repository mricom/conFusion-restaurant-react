import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  List,
  BreadcrumbItem,
  Breadcrumb,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

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
        <CommentForm></CommentForm>
      </>
    );
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <>
        <Button
          type="button"
          outline
          onClick={this.toggleModal}
          id="comment-form-open-button"
        >
          <span className="fa fa-pencil mr-2"></span>Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm>
              <div className="form-group">
                <Label for="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label for="author">Your Name</Label>
                <Control.text
                  model=".author"
                  className="form-control"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <Label for="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  className="form-control"
                  id="comment"
                  name="comment"
                  placeholder="Your Name"
                  rows="6"
                />
              </div>
              <div className="form-group">
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </div>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const DishDetail = (props) => {
  if (props.dish === null) {
    return <div></div>;
  } else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );
  }
};

export default DishDetail;
