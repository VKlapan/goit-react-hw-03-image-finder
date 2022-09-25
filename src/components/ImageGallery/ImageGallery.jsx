import { Component } from 'react';
import axios from 'axios';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { Gallery, GalleryList } from './ImageGallery.styled';
import Button from './Button/Button';
import Loader from './Loader/Loader';

class ImageGallery extends Component {
  BASE_URL = 'https://pixabay.com/api/';
  API_KEY = '28999251-52156a0b70764a414979b8adf';
  PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';
  per_page = 12;

  state = {
    images: [],
    query: '',
    loading: false,
    error: null,
    page: 1,
    total: 1,
  };

  searchImage = query => {
    this.setState({ loading: true, query: query, error: null, images: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async getImages() {
    await this.getGalleryData(this.getUrl())
      .then(result => {
        const newImages = [...this.state.images, ...result.images];
        this.setState({ images: newImages, total: result.total });
      })
      .catch(error => this.setState({ error: error }))
      .finally(() => this.setState({ loading: false }));
  }

  getUrl() {
    const url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.state.query}&${this.PARAMS}&page=${this.state.page}&per_page=${this.per_page}`;
    return url;
  }

  async getGalleryData(url) {
    const response = await axios.get(url);
    const images = response.data.hits;
    let result = null;

    if (images.length === 0) {
      return Promise.reject(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      result = {
        images: images,
        total: response.data.totalHits,
      };
      return result;
    }
  }

  async componentDidMount() {
    //   this.getImages();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.searchImage(this.props.query);
    }

    if (prevState.query !== this.state.query) {
      this.getImages();
    }

    if (prevState.page !== this.state.page) {
      this.getImages();
    }
  }

  render() {
    const { images, total } = this.state;
    const totalPages = Math.ceil(total / this.per_page);

    return (
      <Gallery>
        {this.state.loading && <Loader />}
        {this.state.error && <div>Opsss... {this.state.error}</div>}
        <GalleryList>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={this.toggleModal}
            />
          ))}
        </GalleryList>
        {this.state.page < totalPages && (
          <Button clickHandle={this.loadMore}>LOAD MORE</Button>
        )}
      </Gallery>
    );
  }
}
export default ImageGallery;
