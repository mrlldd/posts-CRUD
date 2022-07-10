import React from 'react';
import {IdentifiedPost} from "../../types";
import {Box, Container, Divider, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {useNavigate} from "react-router-dom";
import FetchingPipeline from "../FetchingPipeline/FetchingPipeline";
import {apiRoute, fetchJson} from "../../utils";

interface PostsListProps {
    posts: IdentifiedPost[] | undefined
}

function PostsList(props: PostsListProps) {
    const navigate = useNavigate();
    const posts = props.posts;
    if (!posts) {
        return <>No posts</>
    }

    return <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
        <List>
            {posts.map((post, index) =>
                <Container key={'posts-item-' + post.id}>
                    <Divider key={'posts-item-top-divider-' + post.id}/>
                    <ListItem disablePadding key={'posts-' + post.id}>
                        <ListItemButton onClick={() => navigate(`/details/${post.id}`)}>
                            <ListItemText primary={post.title} secondary={post.body}/>
                        </ListItemButton>
                    </ListItem>
                    {index !== 0 ? <Divider key={'posts-item-bottom-divider-' + post.id}/> : <></>}
                </Container>
            )
            }
        </List>
    </Box>;
}

function Home() {
    return <FetchingPipeline queryKey='posts'
                             queryFn={() => fetchJson<IdentifiedPost[]>(apiRoute)}
                             successComponent={p => <PostsList posts={p}/>}/>;
}

export default Home;
