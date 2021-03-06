import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ImageView, ImageContainer, Controls, Label, Details, Description, Back } from './Style';
import ViewContainer from '../../shared/components/ViewContainer';
import SecondaryTitle from '../../shared/components/SecondaryTitle';
import Api from '../../utils/Api';

const Image = ({ page_title }) => {
  const { name, id } = useParams();
  const [image, setImage] = useState();
  const [nextImage, setNextImage] = useState();
  const [prevImage, setPrevImage] = useState();
  const [galleryName, setGalleryName] = useState();

  useEffect(() => {
    Api.getImage(id)
      .then(response => {
        setImage(response.data.data)
      })
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    const getGallery = async () => {
      const thisGallery = (await Api.getGallery(name)).data.data.gallery;
      setGalleryName(thisGallery.name)
      const index = thisGallery.images.findIndex(image => image === id);
      if (index === thisGallery.images.length - 1) {
        setNextImage(thisGallery.images[0]);
        setPrevImage(thisGallery.images[index - 1]);
      } else if (index === 0) {
        setPrevImage(thisGallery.images[thisGallery.images.length - 1]);
        setNextImage(thisGallery.images[index + 1]);
      } else {
        setNextImage(thisGallery.images[index + 1]);
        setPrevImage(thisGallery.images[index - 1]);
      }
    };
    getGallery();
  }, [id, name]);

  return (
    <>
      <SecondaryTitle text={page_title} />
      <ViewContainer>
        <Back>
          <Link to={`/galleries/${name}`}>{`< back to ${galleryName}`}</Link>
        </Back>
        <ImageContainer>
          <ImageView src={image?.image_url} alt={image?.alt_text} />
          <Controls>
            {/* <Link to={`/galleries/${name}`}>Back to {gallery?.name}</Link> */}
            <Link to={`/galleries/${name}/${nextImage}`}>{`< prev`}</Link>
            <Link to={`/galleries/${name}/${prevImage}`}>{`next >`}</Link>
          </Controls>
          <Description>
            {image?.caption?.title ? <><Label>Title:</Label><Details>{image.caption.title}</Details></> : null}
            {image?.caption?.year ? <><Label>Year:</Label><Details>{image.caption.year}</Details></> : null}
            {image?.caption?.media ? <><Label>Media:</Label><Details>{image.caption.media}</Details></> : null}
            {image?.caption?.dimensions ? <><Label>Dimensions:</Label><Details>{image.caption.dimensions}</Details></> : null}
          </Description>
          {image?.description ? 
          <Description>
            <Label>Description:</Label>
            <p>{image?.description}</p>
          </Description> : null }
            
        </ImageContainer>
      </ViewContainer>
    </>
  );
};

export default Image;
