import * as Email from '@/components/emailComponents';
const imgPath = `/assets/${localStorage.getItem('lastSelectedEmailId')}/images`;

export const variables = {
  images: {
    header: `${imgPath}/email-header-600x250.PNG`,
    headerMobile: `${imgPath}/email-header-600x250.PNG`,
    example: `${imgPath}/example.jpg`,
  },
  components: {
    CTA: Email.CTA,
    Image: Email.Image,
    Link: Email.Link,
    Salutation: Email.Salutation,
  },
};
