import type {Plugin} from '@docusaurus/types';
import {NEWSFEED} from '../data/hub';
import {NEWSFEED_FALLBACK, type NewsfeedMeta} from '../data/newsfeed-meta';
import {fetchNewsfeedMeta} from './newsfeed-source';

export default function newsfeedMetaPlugin(): Plugin<NewsfeedMeta> {
  return {
    name: 'newsfeed-meta',
    loadContent() {
      return fetchNewsfeedMeta({
        repo: NEWSFEED.repo, branch: 'main', fallback: NEWSFEED_FALLBACK,
        token: process.env.GITHUB_TOKEN,
      });
    },
    contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
}
