import { FeedRequestProps, SearchRequestProps } from '../hooks/usePosts';
import { setAccessToken } from '../utils/cookie';
import { client, publicClient } from './client';

export type SortType = 'CREATED_AT' | 'LIKES' | 'HITS';
export type PartType = 'plan' | 'dev' | 'design';
export type ActType = 'society' | 'project' | 'intern';
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
      isScrapped: boolean;
    }
  ];
  totalPages: number;
  totalResults: number;
}

export interface ScrapResponse {
  scraps: number;
  isScrapped: boolean;
}

export const postAPI = {
  ALL: async (
    token: string,
    param: FeedRequestProps
  ): Promise<PostResponse> => {
    const response = await publicClient.get(`/posts/all?`, {
      params: {
        ...param,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  },

  SEARCH: async (data: SearchRequestProps): Promise<PostResponse> => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    let param = keys.reduce((accumulator, value, index) => {
      return { ...accumulator, [value]: values[index] };
    }, {});

    const response = await client.get('/posts/search', {
      params: { ...param },
    });

    console.log('response', response.data.data);

    return response.data.data;
  },

  SCRAP: async (postId: number): Promise<ScrapResponse> => {
    const response = await client.get(`/posts/scraps/${postId}`);
    console.log(postId);
    return response.data.data;
  },
};

export default postAPI;
