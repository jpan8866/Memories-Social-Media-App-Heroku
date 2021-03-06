import Post from "./Post/Post";
import useStyles from './styles';
import { useSelector, useDispatch } from "react-redux";
import { Grid, CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import { getPosts } from "../../actions/posts";

const Posts = () => {
    const postsStyles = useStyles();
    const dispatch = useDispatch();
    const updateId = useSelector(state => state.posts.updateId);

    // Include updateId in bracket so that everytime its value changes, the posts are fetched
    // required when we make updates to a post. 
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, updateId]);

    const posts = useSelector(state => state.posts.posts) 
    // note 1st posts is the postsReducer, 2nd is the posts element of that state object (see postsReducer)
    //console.log(posts);
    return (
        // if no posts or if still loading (since async), display spinning circle
        // else display posts
        !posts.length ? <CircularProgress /> : (
            <Grid className={postsStyles.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        {/* send the post to the Post component as a prop */}
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;