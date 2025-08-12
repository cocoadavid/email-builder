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
  },
  dynamicSections: true, // import sections dynamically
};
