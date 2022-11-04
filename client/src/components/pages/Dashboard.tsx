import { Breadcrumb, Upload, Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { useEffect } from 'react';
import DashRow from '../DashRow';

export default function Dashboard() {
  const topTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    console.log('component did mount dashboard');
  });

  return (
    <Layout>
      <Header>
        Dashboard
        <Breadcrumb>wow</Breadcrumb>
        <Upload name='beat' action='http://localhost:3001/api/upload/beat'>Upload Beat</Upload>
        <Content>
          {topTen.map((beat) => {
            return <DashRow beat={beat} />;
          })}
        </Content>
      </Header>
    </Layout>
  );
}
