import { Flex, Layout } from "antd";

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout.Content style={{ padding: "0 48px", height: "calc(100vh - 64px)" }}>
      <Flex vertical>{children}</Flex>
    </Layout.Content>
  );
};

export default Content;
