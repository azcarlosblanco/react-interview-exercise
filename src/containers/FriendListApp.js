import React, { Component } from 'react';
import styles from './FriendListApp.css';
import { connect } from 'react-redux';

import {addFriend, deleteFriend, starFriend} from '../actions/FriendsActions';
import { FriendList, AddFriendForm } from '../components';
import Pagination from '../components/Pagination/Pagination';

class FriendListApp extends Component {

  render () {
    const { friendlist: { friendsById }} = this.props;
    const totalFriends = friendsById.length;

    const { currentPage, pageLimit } = this.state;
    const offset = (currentPage - 1) * pageLimit;
    const currentFriends = friendsById.slice(offset, offset + pageLimit);

    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend
    };

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendForm addFriend={actions.addFriend} />
        <FriendList friends={currentFriends} actions={actions} />
        <Pagination 
          totalRecords={totalFriends} 
          pageLimit={2}
          pageNeighbours={1}
          onPageChanged={this.onPageChanged}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = { currentPage: null, pageLimit: null  }

    this.onPageChanged = this.onPageChanged.bind(this);
  }

  onPageChanged(data) {
    const { currentPage, pageLimit } = data;
    this.setState({ currentPage, pageLimit });
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  addFriend,
  deleteFriend,
  starFriend
})(FriendListApp)
