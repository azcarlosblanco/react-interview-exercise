import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './AddFriendForm.css';
import alertMessages from '../../constants/AlertMessages';

class AddFriendForm extends Component {
  render () {
    return (
      <form className={classnames(styles.addFriendForm)} onSubmit={this.handleSubmit}>
        <div className="form-group">
            <input
              type="text"
              name="name"
              autoFocus="true"
              className="form-control"
              placeholder="Type the name of a friend"
              value={this.state.name}
              onChange={this.onInputChange}
            />
        </div>
        <div className="form-group">
          <div className="radio-inline">
            <label>
              <input 
                type="radio" 
                name="gender" 
                value="male" 
                onChange={this.onInputChange}
              />
              Male
            </label>
          </div>
          <div className="radio-inline">
            <label>
              <input type="radio" 
                name="gender"
                value="female" 
                onChange={this.onInputChange}
              />
              Female
            </label>
          </div>          
        </div>
        <div className="form-group">
          <button type="submit" className={classnames("btn btn-primary form-control", styles.btnPrimary)}>Add</button>
        </div>

        {this.state.status && (
          <div className="alert alert-info" role="alert">{this.state.status}</div>
        )}
      </form>

    )
  }

  constructor (props, context) {
    super(props, context);

    this.state = {
      name: this.props.name || '',
      gender: this.props.gender,
      status: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })   
  }

  handleSubmit (e) {
    e.preventDefault();

    const { name, gender }  = this.state;

    if(name && gender) {
        this.props.addFriend(name, gender);
        this.setState({ name: '', gender: '', status: alertMessages.success });
    } else {

      if(!name) {
        this.setState({ status: alertMessages.requiredName });
      } else if(!gender) {
        this.setState({ status: alertMessages.requiredGender });
      }
    
    }
  }

}

AddFriendForm.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendForm
