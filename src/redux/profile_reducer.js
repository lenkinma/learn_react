const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';


let initialState = {
	posts: [
		{ id: 1, message: 'hello!!! this is my first post', likes_count: 10 },
		{ id: 2, message: 'okay, bro, its cool!', likes_count: 16 },
	],
	newPostText: '',
};

const profileReducer = (state = initialState, action) => {

	switch (action.type){
		case ADD_POST:
			let newPost = {
				id: 4,
				message: state.newPostText,
				likes_count: 0,
			};
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: '',
			};

		case UPDATE_NEW_POST_TEXT:
			return {
				...state,
				newPostText: action.newText,
			}

		default:
			return state;
	}
};

export const addPostActionCreator = () => ({
	type: ADD_POST,
});
export const updateNewPostTextActionCreator = (text) => ({
	type: UPDATE_NEW_POST_TEXT,
	newText: text,
});

export default profileReducer;