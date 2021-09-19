/* eslint-disable @next/next/no-document-import-in-page */
import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
