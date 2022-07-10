import React from 'react';
import {Post} from "../../types";
import {Controller, useForm} from "react-hook-form";
import {Button, CircularProgress, Container, Paper, TextField} from "@mui/material";
import {useMutation} from "react-query";
import {apiRoute} from "../../utils";
import {useNavigate} from 'react-router-dom';

interface PostEditorProps {
    post: Partial<Post>;
    id?: number;
}

function PostEditor(props: PostEditorProps) {
    function withoutLineBreaks(str: string | undefined): string | undefined {
        return str?.replace(/(\r\n|\n|\r)/gm, "");
    }

    const defaultValues = {
        title: withoutLineBreaks(props.post.title) || '',
        body: withoutLineBreaks(props.post.body) || ''
    };

    function isEdited(post: Partial<Post>): boolean {
        return post.title !== defaultValues.title || post.body !== defaultValues.body;
    }

    const {control, formState, handleSubmit, watch} = useForm({
        defaultValues,
        mode: "onChange"
    });
    const navigate = useNavigate();

    const {
        mutate: create,
        isLoading: isCreating
    } = useMutation((post: Partial<Post>) => fetch(props.id ? `${apiRoute}/${props.id}` : apiRoute, {
        method: props.id ? 'PUT' : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(post)
    }), {
        onSuccess: () => {
            if (!props.id) {
                navigate('/home')
            }
        }
    });
    const {mutate: deletePost, isLoading: isDeleting} = useMutation(() => fetch(`${apiRoute}/${props.id}`, {
        method: 'DELETE'
    }), {
        onSuccess: () => navigate('/home')
    });

    const onValidSaveSubmit = (data: Partial<Post>) => {
        create(data);
    }

    const onValidDeleteSubmit = () => {
        if (!props.id) {
            throw new Error('Post id is missing');
        }
        deletePost();
    }

    const isLoading = isCreating || isDeleting;

    return <Paper sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }}>
        <form style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '1rem',
                margin: '1rem'
            }}>
                <Controller name='title'
                            control={control}
                            rules={{
                                minLength: 3,
                                required: true
                            }}
                            render={({field}) => (
                                <TextField {...field} label="Title"/>
                            )}/>
                <Controller name='body'
                            control={control}
                            rules={{
                                minLength: 3,
                                required: true
                            }}
                            render={({field}) => (
                                <TextField {...field} label="Body"/>
                            )}/>
                <Container sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Button disabled={isLoading}
                            sx={{
                                visibility: props.id ? 'visible' : 'hidden'
                            }}
                            color='error'
                            onClick={handleSubmit(onValidDeleteSubmit, console.log)}>
                        Delete
                    </Button>

                    {isLoading ? <CircularProgress size={'2rem'}/> : <></>}
                    <Button disabled={!isEdited(watch()) || !formState.isValid || isLoading}
                            onClick={handleSubmit(onValidSaveSubmit, console.log)}>
                        Save
                    </Button>
                </Container>
            </Container>
        </form>
    </Paper>;
}

export default PostEditor;
