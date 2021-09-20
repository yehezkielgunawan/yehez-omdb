import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Img,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { KeyboardEventHandler, useEffect, useState } from "react";

import { useAPIKeyContext } from "../components/provider";
import { useAppToast } from "../components/ui/AppToast";
import ModalDialogComponent from "../components/ui/ModalDialog";
import { Main } from "../components/wrapper/Main";
import { INITIAL_MOVIE_RES } from "../constants/Initial_types";
import { useDesktopWidthCheck } from "../functions/helpers/desktopWidthChecker";
import { getMovieRes } from "../functions/lib/fetcher";
import { ErrMessage, MovieList } from "../functions/lib/types";

const Index = () => {
  const { api_key } = useAPIKeyContext();
  const toast = useAppToast();
  const isDesktopWidth = useDesktopWidthCheck();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageModalSrc, setImageModalSrc] = useState<string>("");
  const [moviesRes, setMoviesRes] = useState<MovieList>(INITIAL_MOVIE_RES);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const getMovieListRes = async (
    searchKey: string,
    apiKey: string,
    page: number,
  ) => {
    await getMovieRes(searchKey, apiKey, page)
      .then((res: MovieList) => {
        setMoviesRes(res);
      })
      .catch((err: ErrMessage) => {
        toast({
          status: "warning",
          title: err.Error,
        });
      });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = async () => {
    keyword.length > 2
      ? await getMovieListRes(keyword, api_key, page)
      : toast({
          status: "info",
          title: "Write your keyword (it must be more than 3 characters)",
        });
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleOpenImageModal = (imageSrc: string) => {
    setImageModalSrc(imageSrc);
    onOpen();
  };

  const prevPage = async () => {
    setPage(page - 1);
    await handleSubmit();
  };

  const nextPage = async () => {
    setPage(page + 1);
    await handleSubmit();
  };

  useEffect(() => {
    handleSubmit();
  }, [page]);

  return (
    <Main>
      <Text>
        Want to know your favourite movie more? Here is the right place.
      </Text>
      <Input
        placeholder="Input the movie title or keyword"
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

      {moviesRes.Response === "True" && moviesRes.totalResults > 10 && (
        <Flex align="center" justify="center" gridGap={3}>
          <IconButton
            aria-label="prevPage"
            disabled={page === 1}
            icon={<ChevronLeftIcon />}
            onClick={() => prevPage()}
          ></IconButton>
          <IconButton
            aria-label="nextPage"
            disabled={moviesRes.totalResults / page < 10}
            icon={<ChevronRightIcon />}
            onClick={() => nextPage()}
          ></IconButton>
        </Flex>
      )}
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
              <Flex gridGap={3} align="center" justify="left">
                <Img
                  src={movie.Poster}
                  boxSize={isDesktopWidth ? "140px" : "100px"}
                  align="center"
                  objectFit="contain"
                  onClick={() => handleOpenImageModal(movie.Poster)}
                />
                <NextLink href={`/${movie.imdbID}`} passHref>
                  <Stack spacing={2} justify="left" as="a">
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
                </NextLink>
              </Flex>
            </Box>
          ))}
      </SimpleGrid>
      {moviesRes.Response === "False" && (
        <Text textAlign="center">
          <b>Oops not found!</b>
        </Text>
      )}
      <ModalDialogComponent
        isOpen={isOpen}
        onClose={onClose}
        imageSrc={imageModalSrc}
      />
    </Main>
  );
};

export default Index;
