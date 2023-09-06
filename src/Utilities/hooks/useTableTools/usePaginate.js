import React, { useState } from 'react';
import {
  Skeleton,
  SkeletonSize,
} from '@redhat-cloud-services/frontend-components/Skeleton';

const usePaginate = (options = {}, isTableLoading, updateSearchParams) => {
  const { perPage, page } = options;
  const enablePagination = options?.pagination !== false;

  const [paginationState, setPaginationState] = useState({
    perPage,
    page,
  });

  const setPagination = (newState) => {
    updateSearchParams({
      limit: newState.perPage,
      offset: (newState.page - 1) * newState.perPage,
    });
    setPaginationState({
      ...paginationState,
      ...newState,
    });
  };

  const onSetPage = (_, page) => setPagination({ ...paginationState, page });

  const onPerPageSelect = (_, perPage) => setPagination({ page: 1, perPage });

  /*const paginator = (items) => {
    const { page, perPage } = paginationState;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return items.slice(start, end);
  };*/

  const setPage = (page) => {
    const nextPage = page < 0 ? paginationState.page + page : page;
    setPagination({
      page: nextPage > 0 ? nextPage : 1,
    });
  };

  return enablePagination
    ? {
        //paginator,
        setPage,
        toolbarProps: {
          pagination: !isTableLoading ? (
            {
              ...paginationState,
              onSetPage,
              onPerPageSelect,
            }
          ) : (
            <Skeleton size={SkeletonSize.lg} />
          ),
        },
      }
    : {};
};

export default usePaginate;
