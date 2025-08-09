import * as Email from '@/components/emailComponents';
const imgPath = `/emails/${localStorage.getItem('lastSelectedEmailId')}/images`;

export const variables = {
  images: {
    header: '/emailheader.jpg',
    headerMobile: '/emailheader.jpg',
    example: '/react-icon.png',
  },
  thirdpartyImages: {
    header: `${imgPath}/emailheader.jpg`,
    headerMobile: `${imgPath}/emailheader.jpg`,
    example: '/react-icon.png',
  },
  components: {
    Link: Email.Link,
    Image: Email.Image,
  },
};
