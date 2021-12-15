import React, { Fragment } from 'react';
import './styles/bootstrap.min.css';
import './styles/styleCreateEdit.css';

class CreatePlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      experience: '',
      showData: false,
      disabled: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    switch (event.target.id) {
      case 'username':
        this.setState({ username: event.target.value });
        break;
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'experience':
        this.setState({ experience: event.target.value });
        break;
      default:
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      showData: true,
      username: event.target[0].value,
      email: event.target[1].value,
      experience: event.target[2].value,
      disabled: true,
    });

    for (let i = 0; i < event.target.length; i++) {
      event.target[i].value = '';
    }
  }

  test() {}

  render() {
    const showPlayer = () => {
      if (this.state.showData) {
        return (
          <Fragment>
            <div class="container-sm">
              <div class="row justify-content-center">
                <div class="col-md-5">
                  <p>
                    Username: <strong>{this.state.username}</strong>
                  </p>
                  <br />
                  <p>
                    Email: <strong>{this.state.email}</strong>
                  </p>
                  <br />
                  <p>
                    Experience: <strong>{this.state.experience}</strong>
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </Fragment>
        );
      }
    };

    return (
      <Fragment>
        <div className="background">
          <div class="container-sm">
            <br />
            <h2 class="row justify-content-center">CREATE PLAYER</h2>
            <div class="row justify-content-center">
              <div class="col-md-5">
                <form onSubmit={this.handleSubmit}>
                  <label class="col-form-label" for="username">
                    Username
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    disabled={this.state.disabled}
                  />
                  <br />
                  <label class="col-form-label" for="email">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    disabled={this.state.disabled}
                  />
                  <br />
                  <label class="col-form-label" for="experience">
                    Experience
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="experience"
                    disabled={this.state.disabled}
                  />
                  <br />
                  <button class="btn btn-warning btn-lg">Create</button>
                </form>
              </div>
            </div>
          </div>
          <br />
          {showPlayer()}
          <br />
        </div>
      </Fragment>
    );
  }
}

export default CreatePlayer;
