import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image }) => {
  const { webformatURL, tags } = image;

  return (
    <GalleryItem>
      <GalleryItemImage src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
