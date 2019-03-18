import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './FriendListItem.css';

const FriendListItem = ({ id, name, gender, starred, starFriend, deleteFriend }) => {
  return (
    <li className={styles.friendListItem}>
      <div className={styles.friendInfos}>
        <div><span>{name}</span></div>
        {gender && (
          <div>
            <small>Gender: <strong>{gender}</strong></small>
          </div>
        )}
        <div>
          <small>xx friends in common</small>
        </div>
      </div>
      <div className={styles.friendActions}>
        <button className={`btn btn-default ${styles.btnAction}`}
                onClick={() => starFriend(id)}>
          <i className={classnames('fa', {
            'fa-star': starred,
            'fa-star-o': !starred
          })} />
        </button>
        <button className={`btn btn-default ${styles.btnAction}`}
                onClick={() => deleteFriend(id)}>
          <i className="fa fa-trash" />
        </button>
      </div>
    </li>
  );
}

FriendListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  starred: PropTypes.bool,
  starFriend: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired
};

export default FriendListItem
