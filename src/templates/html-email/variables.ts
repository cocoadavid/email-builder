import * as Email from '@/components/emailComponents';
//const imgPath = `/assets/${localStorage.getItem('lastSelectedEmailId')}/images`;

export const variables = {
  images: {
    header: '/assets/example//email-header-600x250.PNG',
    headerMobile: '/assets/example//email-header-600x250.PNG',
    example: '/assets/example/example.jpg',
  },
  components: {
    CTA: Email.CTA,
    Image: Email.Image,
    Link: Email.Link,
    Salutation: Email.Salutation,
  },
};
