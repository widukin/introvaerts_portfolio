import { Switch, Route } from 'react-router-dom';
import About from '../views/About';
import Contact from '../views/Contact';
import Gallery from '../views/Gallery';
import Image from '../views/Image';
import Title from '../shared/components/Title'

const MainRouter = ({ userDetails }) => {
  const { subdomain } = userDetails;
  const { contact, about, page_title } = subdomain;

  return (
    <Switch>
      <Route exact path="/">
        <Title text={page_title} />
      </Route>
      <Route exact path="/about">
        
        <About
          pageTitle={page_title}
          tagLine={about?.tagline}
          aboutImage={about?.about_image_url}
          description={about?.description}
        />
      </Route>
      <Route exact path={'/galleries/:galleryId'} >
        <Gallery page_title={page_title}/>
      </Route>
      <Route exact path={'/galleries/:name/:id'}>
        <Image page_title={page_title}/>
      </Route>

      <Route exact path="/contact">
        <Contact
          firstName={contact?.first_name}
          lastName={contact?.last_name}
          contactTagline={contact?.contact_tagline}
          address={contact?.address}
          phoneNumber={contact?.phone_number}
          businessEmail={contact?.business_email}
          page_title={page_title}
        />
      </Route>
    </Switch>
  );
};

export default MainRouter;
