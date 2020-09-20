import { FC, useState, useCallback, ChangeEvent, FormEvent } from "react";
import styled from "@emotion/styled";
import { DARK_COLOR, THEME_COLOR } from "../../Colors";
import { SearchSvg } from "../../../svgs/search-24px.svg";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  padding: 1em;
`;

const SiteNamePart = styled.div`
  display: block;
  font-weight: bold;
  > a {
    color: ${DARK_COLOR};
    text-decoration: none;
    vertical-align: middle;
  }
`;

const SearchPostPart = styled.form`
  position: relative;
`;

const Input = styled.input`
  display: block;
  border: solid 1px ${DARK_COLOR};
  border-radius: 4px;
  width: 10em;
  padding-right: 1em;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: solid 1px ${DARK_COLOR};
  background-color: ${THEME_COLOR};
  border-radius: 4px;
  > svg {
    width: 1em;
    height: 1em;
    fill: white;
  }
`;

const useSearch = () => {
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearchValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [setSearchValue]
  );

  const onSearch = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (searchValue === "") {
        window.location.href = "/";
        return;
      }
      window.location.href = `/posts/search?word=${searchValue}`;
    },
    [searchValue]
  );

  return { searchValue, onChangeSearchValue, onSearch };
};

export const Header: FC = () => {
  const { searchValue, onChangeSearchValue, onSearch } = useSearch();

  return (
    <Container>
      <SiteNamePart>
        <a href="/">iam.oke.tokyo</a>
      </SiteNamePart>
      <SearchPostPart onSubmit={onSearch}>
        <Input type="text" value={searchValue} onChange={onChangeSearchValue} />
        <SearchButton type="submit">
          <SearchSvg />
        </SearchButton>
      </SearchPostPart>
    </Container>
  );
};
