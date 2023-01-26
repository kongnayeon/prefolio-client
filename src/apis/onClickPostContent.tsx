import { client } from './client';

export function getScraps(postId: number) {
  return client.get(`/posts/scraps/${postId}`).then((res) => {
    console.log(res.data);

    return res.data;
  });
}

export function getLikes(postId: number) {
  return client.get(`/posts/likes/${postId}`).then((res) => {
    console.log(res.data);

    return res.data;
  });
}