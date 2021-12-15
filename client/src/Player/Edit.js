import React, { Fragment } from 'react';
import './styles/bootstrap.min.css';
import './styles/styleCreateEdit.css';

class EditPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedUsername: '',
      updatedEmail: '',
      updatedExperience: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      updatedUsername: event.target[0].value,
      updatedEmail: event.target[1].value,
      updatedExperience: event.target[2].value,
    });
  }

  render() {
    return (
      <Fragment>
        <div class="background">
          <div class="container-sm">
            <br />
            <h2 class="row justify-content-center">EDIT PLAYER</h2>
            <div class="row justify-content-center">
              <div class="col-md-5">
                <form onSubmit={this.handleSubmit}>
                  <label class="col-form-label" for="username">
                    Username
                  </label>
                  <input type="text" class="form-control" id="username" />
                  <br />
                  <label class="col-form-label" for="email">
                    Email
                  </label>
                  <input type="email" class="form-control" id="email" />
                  <br />
                  <label class="col-form-label" for="experience">
                    Experience
                  </label>
                  <input type="number" class="form-control" id="experience" />
                  <br />
                  <button class="btn btn-warning btn-lg">Edit</button>
                </form>
                <br />
                <p>
                  Updated username:{' '}
                  <strong>{this.state.updatedUsername}</strong>
                </p>
                <br />
                <p>
                  Updated email: <strong>{this.state.updatedEmail}</strong>
                </p>
                <br />
                <p>
                  Updated experience:{' '}
                  <strong>{this.state.updatedExperience}</strong>
                </p>
              </div>
            </div>
          </div>
          <br />
        </div>
      </Fragment>
    );
  }
}

export default EditPlayer;
