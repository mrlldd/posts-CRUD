import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {QueryFunction, QueryKey, useQuery} from "react-query";
import {UseQueryResult} from "react-query/types/react/types";
import {CircularProgress} from "@mui/material";

interface FetchingPipelineProps<TQueryKey extends QueryKey, T> extends PropsWithChildren {
    queryKey: TQueryKey;
    queryFn: QueryFunction<T, TQueryKey>
    successComponent: FC<T | undefined>
}

function useOneTimeQuery<TQueryKey extends QueryKey, T>(key: TQueryKey, fn: QueryFunction<T, TQueryKey>): UseQueryResult<T> {
    const [enabled, setEnabled] = useState(true);
    const query = useQuery(key, fn, {enabled});
    useEffect(() => {
        if (query.isSuccess) {
            setEnabled(false);
        }
    }, [setEnabled, query])
    return query;
}

function FetchingPipeline<TQueryKey extends QueryKey, T>(props: FetchingPipelineProps<TQueryKey, T>) {
    const query = useOneTimeQuery(props.queryKey, props.queryFn);

    if (query.isLoading) {
        return <CircularProgress/>;
    }

    if (query.error) {
        return <>An error has occurred:  + {query.error}</>;
    }

    return props.successComponent(query.data);
}

export default FetchingPipeline;
