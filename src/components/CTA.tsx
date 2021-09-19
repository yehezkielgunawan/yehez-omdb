import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";

import { useDesktopWidthCheck } from "../functions/helpers/desktopWidthChecker";
import { DarkModeSwitch } from "./DarkModeSwitch";

export const CTA = () => {
  const { colorMode } = useColorMode();
  const isDesktopWidth = useDesktopWidthCheck();
  return (
    <Box
      justifyContent="start"
      bg={colorMode === "light" ? "white" : "gray.700"}
      position="fixed"
      width="100%"
      opacity="0.95"
      top={0}
      zIndex={5}
      px={isDesktopWidth ? 0 : 2}
    >
      <Flex
        justifyContent="space-between"
        maxW="48rem"
        align="center"
        mx="auto"
        py={2}
      >
        <Text>Yehez-OMDB</Text>
        <DarkModeSwitch />
      </Flex>
    </Box>
  );
};
