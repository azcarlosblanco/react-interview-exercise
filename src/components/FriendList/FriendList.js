import React from 'react';
import PropTypes from 'prop-types';
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';

const FriendList = ({friends, actions}) => {
  return (
    <ul className={styles.friendList}>
      {
        friends.map((friend) => {
          return (
            <FriendListItem
              key={friend.id}
              id={friend.id}
              name={friend.name}
              gender={friend.gender}
              starred={friend.starred}
              {...actions} />
          );
        })
      }
    </ul>
  );
}



FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;