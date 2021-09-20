import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Img,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";

import { useAPIKeyContext } from "../components/provider";
import { useAppToast } from "../components/ui/AppToast";
import { Main } from "../components/wrapper/Main";
import { useDesktopWidthCheck } from "../functions/helpers/desktopWidthChecker";
import { getMovieDetails } from "../functions/lib/fetcher";
import { ErrMessage, SingleMovieDetail } from "../functions/lib/types";

const MovieDetails = () => {
  const { api_key } = useAPIKeyContext();
  const toast = useAppToast();
  const isDesktopWidth = useDesktopWidthCheck();
  const router = useRouter();
  const { id } = router.query;
  const [movieDetail, setMovieDetail] = useState<SingleMovieDetail>();

  const getMovieDetailsInfo = async () => {
    await getMovieDetails(String(id), api_key)
      .then((res: SingleMovieDetail) => {
        setMovieDetail(res);
      })
      .catch((err: ErrMessage) => {
        toast({
          status: "error",
          title: "Failed to fetch data.",
          description: err.Error,
        });
      });
  };

  useEffect(() => {
    getMovieDetailsInfo();
  }, []);

  return (
    <Main>
      <Button colorScheme="gray" as="a" href="/" leftIcon={<ChevronLeftIcon />}>
        Back
      </Button>
      {movieDetail && (
        <Flex
          align="center"
          justify="center"
          gridGap={3}
          textAlign="justify"
          wrap="wrap"
        >
          <Img
            src={movieDetail.Poster}
            objectFit="contain"
            align="center"
            borderRadius={4}
            boxSize={isDesktopWidth ? "320px" : "140px"}
          />
          <Stack spacing={3}>
            <Text>
              <b>Title : </b> {movieDetail.Title}
            </Text>
            <Text>
              <b>Year Published :</b> {movieDetail.Year}
            </Text>
            <Text>
              <b>Rated :</b> {movieDetail.Rated}
            </Text>
            <Text>
              <b>Runtime :</b> {movieDetail.Runtime}
            </Text>
            <Text>
              <b>Genre :</b> {movieDetail.Genre}
            </Text>
            <Text>
              <b>Director :</b> {movieDetail.Director}
            </Text>
            <Text>
              <b>Writer :</b> {movieDetail.Writer}
            </Text>
            <Text>
              <b>Actors :</b> {movieDetail.Actors}
            </Text>
            <Text>
              <b>Plot :</b> {movieDetail.Plot}
            </Text>
            <Text>
              <b>Language :</b> {movieDetail.Language}
            </Text>
            <Text>
              <b>Country :</b> {movieDetail.Country}
            </Text>
            <Text>
              <b>Awards :</b> {movieDetail.Awards}
            </Text>
            <Text>
              <b>Ratings :</b>{" "}
              {movieDetail.Ratings.map((rating, index) => {
                return `${index > 0 ? `, ` : ""}${rating.Value}(${
                  rating.Source
                }) `;
              })}
            </Text>
            <Text>
              <b>Metascore :</b> {movieDetail.Metascore}
            </Text>
            <Text>
              <b>IMDB Rating :</b> {movieDetail.imdbRating}
            </Text>
            <Text>
              <b>IMDB ID :</b> {movieDetail.imdbID}
            </Text>
            <Text>
              <b>Type :</b> {movieDetail.Type}
            </Text>
            <Text>
              <b>DVD :</b> {movieDetail.DVD}
            </Text>
            <Text>
              <b>Box Office :</b> {movieDetail.BoxOffice}
            </Text>
            <Text>
              <b>Production :</b> {movieDetail.Production}
            </Text>
            <Text>
              <b>Website :</b> {movieDetail.Website}
            </Text>
          </Stack>
        </Flex>
      )}
      {!movieDetail && <Text>Oops, failed to fetch data.</Text>}
    </Main>
  );
};

export default MovieDetails;
