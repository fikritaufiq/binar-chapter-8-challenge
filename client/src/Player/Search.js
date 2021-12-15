import React, { Component } from 'react';
import './styles/styleSearch.css';

class SearchPlayer extends Component {
  constructor() {
    super();
    this.state = {
      display: false,
      search: '',
      category: '',
      updatedSearch: '',
      updatedCategory: '',
    };

    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // handleSubmit(event){
  //     event.preventDefault()
  //     this.setState({

  //         name: ""
  //     })
  // }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    console.log(this.state.search);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      display: true,
      updatedSearch: this.state.search,
      updatedCategory: this.state.category,
    });
  }

  render() {
    return (
      <div className="wrap">
        <div className="search">
          <form>
            <h2 className="title">do awesome search</h2>
            <input
              type="text"
              className="searchTerm"
              name="search"
              value={this.state.search}
              placeholder="search"
              onChange={(e) => this.handleChange(e)}
            />
            <br />
            <label>
              <input
                type="radio"
                name="category"
                value="username"
                checked={this.state.category === 'username'}
                onChange={(e) => this.handleChange(e)}
              />{' '}
              Username
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="email"
                checked={this.state.category === 'email'}
                onChange={(e) => this.handleChange(e)}
              />{' '}
              email
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="experience"
                checked={this.state.category === 'experience'}
                onChange={(e) => this.handleChange(e)}
              />{' '}
              experience
              <input
                type="radio"
                name="category"
                value="level"
                checked={this.state.category === 'level'}
                onChange={(e) => this.handleChange(e)}
              />{' '}
              level
            </label>
            <br />
            <button
              type="submit"
              className="searchButton"
              onClick={this.handleClick}
            >
              search
            </button>
          </form>
        </div>
        {/* <hr/>

                <p>Inputted Search: {this.state.updatedSearch}</p>
                <p>Category: {this.state.updatedCategory}</p>
                <p></p> */}
        <h2>Search for:</h2>
        {this.state.display && (
          <h3>Inputted search: {this.state.updatedSearch}</h3>
        )}
        {this.state.display && <h3>Search by: {this.state.updatedCategory}</h3>}
      </div>
    );
  }
}

export default SearchPlayer;
