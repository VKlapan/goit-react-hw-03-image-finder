import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';

import {
  HeaderForm,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  render() {
    return (
      <HeaderForm>
        <SearchForm>
          <SearchFormButton type="submit">
            <FcSearch size="30" />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </HeaderForm>
    );
  }
}

export default Searchbar;
