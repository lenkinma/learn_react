import {addPost} from '../../../redux/profile_reducer';
import MyPosts from "./myPosts";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText,
	};
};

let mapDispatchToProps = {
	addPost,
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;