import {
  Box,
  Button,
  Flex,
  Img,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { KeyboardEventHandler, useState } from "react";

import { useAPIKeyContext } from "../components/provider";
import { useAppToast } from "../components/ui/AppToast";
import { Main } from "../components/wrapper/Main";
import { useDesktopWidthCheck } from "../functions/helpers/desktopWidthChecker";
import { getMovieRes } from "../functions/lib/fetcher";
import { MovieList } from "../functions/lib/types";
import { INITIAL_MOVIE_RES } from "./types";

const Index = () => {
  const { api_key } = useAPIKeyContext();
  const toast = useAppToast();
  const isDesktopWidth = useDesktopWidthCheck();
  const [moviesRes, setMoviesRes] = useState<MovieList>(INITIAL_MOVIE_RES);
  const [keyword, setKeyword] = useState<string>("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = async () => {
    keyword.length > 2
      ? setMoviesRes(await getMovieRes(keyword, api_key))
      : toast({
          status: "warning",
          title: "The keyword length must 3 characters or more",
        });
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Main>
      <Text>
        Want to know your favourite movie more? Here is the right place.
      </Text>
      <Input
        placeholder="Input the movie title or keyword that you want to search"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        isRequired
      />
      <Button
        onClick={() => handleSubmit()}
        colorScheme="gray"
        disabled={keyword.length < 3}
      >
        Search
      </Button>
      <SimpleGrid columns={[1, null, 2]} spacing={3}>
        {moviesRes.Response === "True" &&
          (moviesRes.Search ?? []) &&
          moviesRes.Search.map((movie, index) => (
            <Box
              key={index}
              _hover={{
                bg: "gray.500",
              }}
              p={4}
              overflow="hidden"
              borderRadius={10}
              borderWidth={2}
              w="100%"
            >
              <NextLink href={`/${movie.imdbID}`} passHref>
                <Flex as="a" gridGap={3} align="center" justify="left">
                  <Img
                    src={movie.Poster}
                    boxSize={isDesktopWidth ? "140px" : "100px"}
                    align="center"
                    objectFit="contain"
                  />
                  <Stack spacing={2} justify="left">
                    <Text fontSize="sm">
                      <b>Title:</b> {movie.Title}
                    </Text>
                    <Text fontSize="sm">
                      <b> Year Published:</b> {movie.Year}
                    </Text>
                    <Text fontSize="sm">
                      <b>IMDB ID: </b> {movie.imdbID}
                    </Text>
                    <Text fontSize="sm">
                      <b>Type:</b> {movie.Type}
                    </Text>
                  </Stack>
                </Flex>
              </NextLink>
            </Box>
          ))}
      </SimpleGrid>
      {moviesRes.Response === "False" && (
        <Text textAlign="center">
          <b>Oops not found!</b>
        </Text>
      )}
    </Main>
  );
};

export default Index;
