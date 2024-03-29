import {userAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';




let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
	switch (action.type){
		case FOLLOW:
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return {...u, followed: true,}
					}
					return u;
				}),
			};
		case UNFOLLOW:
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return {...u, followed: false,}
					}
					return u;
				}),
			};
		case SET_USERS:
			return {
				...state,
				users: [...action.users],
			};
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage,
			};
		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.totalUsersCount,
			}
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			}
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId)
			}
		default:
			return state;
	}
};

export const followSuccess = (userId) => ({
	type: FOLLOW,
	userId: userId,
});
export const unfollowSuccess = (userId) => ({
	type: UNFOLLOW,
	userId: userId,
});
export const setUsers = (users) => ({
	type: SET_USERS,
	users: users,
});
export const setCurrentPage = (currentPage) => ({
	type: SET_CURRENT_PAGE,
	currentPage: currentPage,
});
export const setTotalUsersCount = (totalUsersCount) => ({
	type: SET_TOTAL_USERS_COUNT,
	totalUsersCount: totalUsersCount,
});
export const toggleIsFetching = (isFetching) => ({
	type: TOGGLE_IS_FETCHING,
	isFetching: isFetching,
});
export const toggleIsFollowingProgress = (isFetching, userId) => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userId,
});


export const getUsersThunk = (currentPage, pageSize) => {
	return async (dispatch) => {
		dispatch(toggleIsFetching(true));

		let data = await userAPI.getUsers(currentPage, pageSize);
			dispatch(setCurrentPage(currentPage));
			dispatch(toggleIsFetching(false));
			dispatch(setUsers(data.items));
			dispatch(setTotalUsersCount(data.totalCount));
	}
}

export const followThunk = (userId) => {
	return async (dispatch) => {
		dispatch(toggleIsFollowingProgress(true, userId));
		let data = await userAPI.follow(userId)
			if (data.resultCode === 0){
				dispatch(followSuccess(userId));
			}
			dispatch(toggleIsFollowingProgress(false, userId));
	}
}

export const unfollowThunk = (userId) => {
	return async (dispatch) => {
		dispatch(toggleIsFollowingProgress(true, userId));
		let data = await userAPI.unfollow(userId)
			if (data.resultCode === 0){
				dispatch(unfollowSuccess(userId));
			}
			dispatch(toggleIsFollowingProgress(false, userId));
	}
}

export default usersReducer;