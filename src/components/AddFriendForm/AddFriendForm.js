import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './AddFriendForm.css';

class AddFriendForm extends Component {
  render () {
    return (
      <form className={classnames(styles.addFriendForm)} onSubmit={this.handleSubmit}>
        <div className="form-group">
            <input
              type="text"
              name="name"
              autoFocus="true"
              className={classnames('form-control', styles.addFriendInput)}
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
                className={classnames(styles.genderFriendInput)} 
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
                className={classnames(styles.genderFriendInput)} 
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
        this.setState({ name: '', gender: '', status: messages.success });
    } else {
      if(!name) {
        this.setState({ status: messages.requiredName });
      }
      
      if(!gender) {
        this.setState({ status: messages.requiredGender });
      }
    }
  }

}

const messages = {
  requiredName: "The name field is required",
  requiredGender : "The gender field is required",
  success: "Your friend have been added",
}

AddFriendForm.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendForm
