import React, { useState, useCallback } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGet } from "../misc/config";
import ShowGrid from "../components/show/ShowGrid";
import ActorGrid from "../components/actor/ActorGrid";
import { useLastQuery } from "../misc/custom-hooks";
import {
  SearchInput,
  RadioInputsWrapper,
  SearchButtonWrapper,
} from "./Home.styled";
import CustomRadio from "../components/CustomRadio";

const renderResults = (results) => {
  if (results && results.length === 0) {
    return <div>No results</div>;
  }

  if (results && results.length > 0) {
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  }

  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");
  const [mode, setMode] = useState("online");

  const isShowsSearch = searchOption === "shows";
  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`)
      .then((result) => {
        // console.log(result);
        setResults(result);
        localStorage.setItem("shows", JSON.stringify(result));
      })
      .catch((err) => {
        let result = localStorage.getItem("shows");
        setResults(JSON.parse(result));
        setMode("offline");
      });
  };

  const onInputChange = useCallback(
    (ev) => {
      setInput(ev.target.value);
    },
    [setInput]
  );

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = useCallback((ev) => {
    setSearchOption(ev.target.value);
  }, []);

  return (
    <MainPageLayout>
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchInput
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      <div>
        {mode === "offline" ? (
          <div class="alert alert-warning" role="alert">
            you are offline now!
          </div>
        ) : null}
      </div>
      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
