import queryString from 'query-string';

export const updateURLParams = (history, limitValue, offsetValue) => {
  history.push({
    search:
      '?' +
      queryString.stringify({
        limit: limitValue,
      }),
  });

  history.push({
    search:
      history.location.search +
      '&' +
      queryString.stringify({
        offset: offsetValue,
      }),
  });
};

const buildSortString = (orderBy, orderDirection) => {
  console.log(orderBy, 'orderBy');
  console.log(orderDirection, 'orderDirection');
  let sortString = orderBy ? '&sort=' : '';
  let direction = '';
  if (orderDirection === 'DESC') {
    direction = '-';
  }
  let order = orderBy === 'updated' ? 'last_seen' : orderBy;

  return `${sortString}${direction}${order}`;
};

export const buildFilterSortString = ({
  limit = 20,
  offset = 0,
  orderBy,
  orderDirection,
  /*filters,
  tags,
  workloadFilters*/
}) => {
  let limitOffsetString = `limit=${limit}&offset=${offset}`;
  let sortString = buildSortString(orderBy, orderDirection);
  //let filterString = buildFilterString(filters);
  //let tagsFilterString = buildTagsFilterString(tags, filters);
  //let workloadFilterString = buildWorkloadFiltersString(workloadFilters);
  return `?${sortString}${limitOffsetString}`;
};
