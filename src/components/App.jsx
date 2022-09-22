import { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  BASE_URL = 'https://pixabay.com/api/';
  API_KEY = '28999251-52156a0b70764a414979b8adf';
  PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';

  query = 'cat';
  per_page = 12;
  currentPage = 1;

  state = {
    images: null,
  };

  getUrl = () => {
    return `${this.BASE_URL}?key=${this.API_KEY}&q=${this.query}&${this.PARAMS}&page=${this.currentPage}&per_page=${this.per_page}`;
  };

  async getPics(url) {
    const response = await axios.get(url);
    const hitsArr = await response.data.hits;

    if (hitsArr.length === 0) {
      return Promise.reject(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      return {
        images: hitsArr,
        total: response.data.totalHits,
      };
    }
  }

  async componentDidMount() {
    const res = await this.getPics(this.getUrl());

    this.setState({ images: res.images });
  }
  render() {
    const { images } = this.state;
    if (!images) return;

    return (
      <>
        <Searchbar />
        <ImageGallery images={images} />
      </>
    );
  }
}
