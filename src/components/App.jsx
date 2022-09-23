import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: null,
    query: '',
  };

  getQuery = query => {
    this.setState({ query: query });
    //    console.log('app get query', this.state.query);
  };

  render() {
    //    console.log('app render', this.state.query);
    return (
      <>
        <Searchbar onSubmit={this.getQuery} />
        <ImageGallery query={this.state.query} />
      </>
    );
  }
}
