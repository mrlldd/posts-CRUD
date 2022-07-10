import React from 'react';
import {useParams} from "react-router-dom";
import PostEditor from "../PostEditor/PostEditor";
import FetchingPipeline from "../FetchingPipeline/FetchingPipeline";
import {apiRoute, fetchJson} from "../../utils";
import {IdentifiedPost} from "../../types";

function Details() {
    const {id} = useParams();
    return <FetchingPipeline queryKey={'post-' + id} queryFn={() => fetchJson<IdentifiedPost>(`${apiRoute}/${id}`)}
                             successComponent={(p) =>
                                 p ? <PostEditor id={p.id}
                                                 post={{
                                                     title: p.title,
                                                     body: p.body
                                                 }}/>
                                     : <></>}/>;
}

export default Details;
