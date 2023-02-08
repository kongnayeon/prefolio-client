import { useEffect, useState } from 'react';

import postAPI, {
  ActType,
  PartType,
  PostResponse,
  SortType,
} from '../apis/post';
import { SinglePostResponse } from '../components/feed/Posts';
import { getCookie } from '../utils/cookie';
import { useTagArea } from './useTagArea';

export interface FeedRequestProps {
  sortBy: string;
  partTagList?: string;
  actTagList?: string;
  pageNum: number;
  limit: number;
}

export interface SearchRequestProps {
  sortBy: string;
  partTagList?: string;
  actTagList?: string;
  pageNum: number;
  limit: number;
  searchWord: string;
}

export type SearchStateType = 'wait' | 'result' | 'none';

export const usePosts = () => {
  const [pageNum, setPageNum] = useState<number>(0);
  const [feed, setFeed] = useState<SinglePostResponse[]>([]);
  const [search, setSearch] = useState<SinglePostResponse[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [searchType, setSearchType] = useState<SearchStateType>('wait');
  const [searchWord, setSearchWord] = useState<string>('');
  const { type, setType, act, setAct, sort, setSort } = useTagArea();

  // 피드
  const getFeed = async (param: FeedRequestProps) => {
    const res: PostResponse = await postAPI.ALL(getCookie(), param);

    if (res && getCookie()) {
      console.log(res);
    }
    if (res.totalPages >= pageNum) {
      setHasMore(true);
      setFeed([...feed, ...res.posts]);
    } else {
      setHasMore(false);
    }
  };

  const getSearch = async (param: SearchRequestProps) => {
    // 현재 많은 프리폴리오 유저들이 읽고 있어요
    if (searchWord === '') {
      getFeed({
        sortBy: 'LIKES',
        pageNum: pageNum,
        limit: 4,
        partTagList: type.join(','),
        actTagList: act.join(','),
      });
      return;
    }

    const feed: PostResponse = await postAPI.SEARCH(param);

    feed.posts.length > 0 ? setSearchType('result') : setSearchType('none');
    if (feed.totalPages >= pageNum) {
      setHasMore(true);
      setSearch([...search, ...feed.posts]);
    } else {
      setHasMore(false);
    }
  };

  return {
    search,
    setSearch,
    getFeed,
    getSearch,
    feed,
    searchType,
    setSearchType,
    searchWord,
    setSearchWord,
    pageNum,
    setPageNum,
    hasMore,
  };
};
