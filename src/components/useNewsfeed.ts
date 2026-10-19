import {usePluginData} from '@docusaurus/useGlobalData';
import {NEWSFEED_FALLBACK, type NewsfeedMeta} from '@site/src/data/newsfeed-meta';

export function useNewsfeedMeta(): NewsfeedMeta {
  return (usePluginData('newsfeed-meta') as NewsfeedMeta | undefined) ?? NEWSFEED_FALLBACK;
}
