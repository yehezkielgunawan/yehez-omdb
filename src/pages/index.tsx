import { Box, Button, Flex, Img, Input, Stack, Text } from "@chakra-ui/react";
import React, { KeyboardEventHandler, useState } from "react";

import { useAPIKeyContext } from "../components/provider";
import { useAppToast } from "../components/ui/AppToast";
import { Main } from "../components/wrapper/Main";
import { getMovieRes } from "../functions/lib/fetcher";
import { MovieList } from "../functions/lib/types";
import { INITIAL_MOVIE_RES } from "./types";

const Index = () => {
  const { api_key } = useAPIKeyContext();
  const toast = useAppToast();
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
      {(moviesRes.Search ?? []) &&
        moviesRes.Search.map((movie, index) => (
          <Stack key={index} spacing={4}>
            <Box
              _hover={{
                bg: "gray.500",
              }}
              p={4}
              overflow="hidden"
              borderRadius={10}
              borderWidth={2}
            >
              <Flex gridGap={4}>
                <Img
                  src={movie.Poster}
                  boxSize="100px"
                  align="center"
                  objectFit="contain"
                />
                <Stack spacing={2}>
                  <Text>Title: {movie.Title}</Text>
                  <Text>Year Published: {movie.Year}</Text>
                  <Text>IMDB ID: {movie.imdbID}</Text>
                  <Text>Type: {movie.Type}</Text>
                </Stack>
              </Flex>
            </Box>
          </Stack>
        ))}
    </Main>
  );
};

export default Index;
