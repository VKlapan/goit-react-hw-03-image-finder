import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL, tags } = image;

  return (
    <GalleryItem>
      <GalleryItemImage src={webformatURL} alt={tags} onClick={onClick} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
