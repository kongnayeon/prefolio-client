import { SearchRequestProps } from '../hooks/useFeed';
import { setAccessToken } from '../utils/cookie';
import { client, publicClient } from './client';

export type SortType = 'CREATED_AT' | 'LIKES' | 'HITS';
export type PartType = 'PLAN' | 'DEV' | 'DESIGN';
export type ActType = 'SOCIETY' | 'PROJECT' | 'INTERN';
export interface PostResponse {
  posts: [
    {
      id: number;
      thumbnail: string;
      title: string;
      partTag: string[];
      actTag: string[];
      hits: number;
      createdAt: string;
    }
  ];
  totalPages: number;
  totalResults: number;
}

export const postAPI = {
  ALL: async (token: string): Promise<PostResponse> => {
    const response = await publicClient.get(`/posts/all?`, {
      params: {
        sortBy: 'CREATED_AT',
        pageNum: 0,
        limit: 16,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  },

  SEARCH: async (data: SearchRequestProps): Promise<PostResponse> => {
    console.log(data);
    const keys = Object.keys(data);
    const values = Object.values(data);

    let param = keys.reduce((accumulator, value, index) => {
      return { ...accumulator, [value]: values[index] };
    }, {});

    const response = await client.post('/post/search', {
      param,
    });

    return response.data.data;
  },
};

export default postAPI;
