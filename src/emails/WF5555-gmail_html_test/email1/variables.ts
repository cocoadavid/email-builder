import * as Email from '@/components/emailComponents';
//const imgPath = `/assets/${localStorage.getItem('lastSelectedEmailId')}/images`;

export const variables = {
  images: {
    header: 'https://i.imgur.com/jJxVWiN.png',
    headerMobile: 'https://i.imgur.com/jJxVWiN.png',
    example: '/assets/example/example.jpg',
  },
  components: {
    CTA: Email.CTA,
    Image: Email.Image,
    Link: Email.Link,
    Salutation: Email.Salutation,
  },
};
