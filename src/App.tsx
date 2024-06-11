import { App as AntdApp, ConfigProvider, Layout, theme } from "antd";
import enUS from "antd/locale/en_US";
import Content from "src/components/Layout/Content";
import Header from "src/components/Layout/Header";
import Products from "src/pages/Products";

const App = () => {
  return (
    <ConfigProvider locale={enUS} theme={{ algorithm: theme.defaultAlgorithm }}>
      <AntdApp>
        <Layout>
          <Header />
          <Content>
            <Products />
          </Content>
        </Layout>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
