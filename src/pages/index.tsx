import { Code, Text } from "@chakra-ui/react";

import { Main } from "../components/wrapper/Main";

const Index = () => {
  return (
    <Main>
      <Text>
        Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{" "}
        <Code>typescript</Code>.
      </Text>
    </Main>
  );
};

export default Index;
