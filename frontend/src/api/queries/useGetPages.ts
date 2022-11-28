import { useQuery } from '@tanstack/react-query';
import { useQueryData } from 'src/api/hooks';
import fetch from 'node-fetch';

export type ArgsT = {};

export const getPages = (args: ArgsT) => {
  return fetch('pages.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(function (response: any) {
    return response.json();
  });
};

export const useGetPages = () => {
  const query = useQuery(['getPages'], () => getPages({}));
  return useQueryData(query);
};
