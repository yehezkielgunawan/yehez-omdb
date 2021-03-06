import { Stack, StackProps } from "@chakra-ui/react";

export const Main = (props: StackProps) => (
  <Stack
    width="100%"
    maxWidth="48rem"
    pt="4rem"
    px={1}
    mt={8}
    spacing={4}
    {...props}
  />
);
