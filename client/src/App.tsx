import 'antd/dist/antd.css';
import Register from './components/Register';
import { Layout } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import Login from './components/Login';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout style={{ width: '100%', height: '100%' }}>
        <Header></Header>
        <Content style={{ padding: '50px', width: '100%', justifyContent: 'center' }}>
          <Login />
        </Content>
        <Footer style={{ textAlign: 'center' }}>SweatshopCalabasas ©2022</Footer>
      </Layout>
    </div>
  );
}

export default App;
