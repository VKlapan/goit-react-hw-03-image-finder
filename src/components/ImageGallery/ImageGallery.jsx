import { Component } from 'react';
import axios from 'axios';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

class ImageGallery extends Component {
  BASE_URL = 'https://pixabay.com/api/';
  API_KEY = '28999251-52156a0b70764a414979b8adf';
  PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';
  per_page = 12;
  currentPage = 1;

  state = {
    images: null,
    loading: false,
  };

  async searchImage(query = '') {
    this.setState({ loading: true });
    await this.getPics(this.getUrl(query))
      .then(result => {
        this.setState({ images: result.images });
      })
      .finally(() => this.setState({ loading: false }));
  }

  getUrl(query) {
    const url = `${this.BASE_URL}?key=${this.API_KEY}&q=${query}&${this.PARAMS}&page=${this.currentPage}&per_page=${this.per_page}`;
    return url;
  }

  async getPics(url) {
    const response = await axios.get(url);
    const hitsArr = await response.data.hits;
    let result = null;

    if (hitsArr.length === 0) {
      return Promise.reject(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      result = {
        images: hitsArr,
        total: response.data.totalHits,
      };
      return result;
    }
  }

  async componentDidMount() {
    // await this.getPics(this.getUrl(this.props.query)).then(result =>
    //   this.setState({ images: result.images })
    // );
    this.searchImage(this.props.query);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      // await this.getPics(this.getUrl(this.props.query)).then(result =>
      //   this.setState({ images: result.images })
      // );
      this.searchImage(this.props.query);
    }
  }

  render() {
    const { images } = this.state;
    if (!images) return;

    return (
      <>
        {this.state.loading && <div> LOADING..............</div>}
        <GalleryList>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </GalleryList>
      </>
    );
  }
}
export default ImageGallery;
