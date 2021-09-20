import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

import APIProvider from "../components/provider";
import { Container } from "../components/wrapper/Container";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <APIProvider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </APIProvider>
    </ChakraProvider>
  );
}

export default MyApp;
