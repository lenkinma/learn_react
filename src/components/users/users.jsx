import styles from './users.module.css';
import axios from "axios";
import userPhoto from '../../assets/images/user.jpg';
import React from "react";

class Users extends React.Component {
componentDidMount() {
	axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
		this.props.setUsers(response.data.items);
	});
}

	render() {

		let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
		let pages = [];
		for (let i = 1; i <= pagesCount; i++){
			pages.push(i);
		}
		return (
			<div>
				<div>
					{pages.map(p => {
						return <span className={this.props.currentPage === p && styles.selectedPage}>{p}</span>
					})}
				</div>
				{/*<button onClick={this.getUsers}>Get users</button>*/}
				{this.props.users.map(u => <div key={u.id}>
				<span>
					<div>
						<img className={styles.userPhoto} src={u.photos.small != null ? u.photos.small : userPhoto}
						     alt={'userPhoto'}/>
					</div>
					<div>
						{u.followed
							? <button onClick={() => this.props.unfollow(u.id)}>unfollow</button>
							: <button onClick={() => this.props.follow(u.id)}>follow</button>
						}
					</div>
				</span>
					<span>
					<span>
						<div>{u.name}</div>
						<div>{u.status}</div>
					</span>
					<span>
						{/*<div>{u.location.country}</div>*/}
						{/*<div>{u.location.city}</div>*/}
					</span>
				</span>
				</div>)}
			</div>
		);
	};
}

export default Users;