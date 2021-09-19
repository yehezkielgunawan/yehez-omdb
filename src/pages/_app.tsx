import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

import { Container } from "../components/wrapper/Container";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
