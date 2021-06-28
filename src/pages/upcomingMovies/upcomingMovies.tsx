import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import upcomingMoviesActions from "redux/actions/upcomingMoviesActions";
import { selectUpcomingMoives } from "redux/selectors/upcomingMovies";

import { IMovie } from "api/Models";

import Constants from "constants/Constants";

import Movie from "components/movie/movie";
import Loader from "components/loader/loader";
import Error from "components/error/error";
import { Block, BlockGroup } from "components/common/block/block";

export interface UpcomingMoviesProps {
  pending: boolean;
  error: boolean;
  data: IMovie[];
  fetchUpcomingMovies: () => void;
}

const UpcomingMovies = ({
  data,
  fetchUpcomingMovies,
  pending,
  error,
}: UpcomingMoviesProps) => {
  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  return (
    <BlockGroup gap={10}>
      <Block justify="center" layout="horizontal" wrapped>
        {data &&
          data?.map((ucm: IMovie) => (
            <StyledLink to={`/movie-overview/${ucm.id}`} key={ucm.id}>
              <Movie movie={ucm} key={ucm.id} />
            </StyledLink>
          ))}
      </Block>

      <Loader pendingState={pending} />
      <Error
        errorText={Constants.ERROR_TEXT.FETCH_UPCOMING_MOVIES_ERROR_TEXT}
        error={error}
      />
    </BlockGroup>
  );
};

const StyledLink = styled(Link)`
  color: #111;
  text-decoration: none;
`;

const mapStateToProps = (state: any) => {
  return {
    data: selectUpcomingMoives(state),
    pending: state.upcoming.pending,
    error: state.upcoming.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(upcomingMoviesActions, dispatch);
};

export const UpcomingMoviesConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingMovies);
