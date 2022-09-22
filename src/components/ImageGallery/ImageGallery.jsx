import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  console.log('in Gallery', images);

  return (
    <GalleryList>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </GalleryList>
  );
};

export default ImageGallery;
