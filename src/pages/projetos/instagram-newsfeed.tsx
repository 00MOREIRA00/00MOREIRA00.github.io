import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import NewsfeedCase from '@site/src/components/NewsfeedCase';
import {NEWSFEED} from '@site/src/data/hub';

export default function Page(): ReactNode {
  return (
    <Layout title={NEWSFEED.nome} description={NEWSFEED.descricao}>
      <NewsfeedCase />
    </Layout>
  );
}
