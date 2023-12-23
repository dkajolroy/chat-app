// Catch exios errors
export const catchError = (error: any): string => {
  return error.response && error.message
    ? error.response.data?.message
    : error.message;
};

// Swr hook query
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
