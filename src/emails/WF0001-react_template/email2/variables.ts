const imgPath = `/assets/${localStorage.getItem('lastSelectedEmailId')}/images`;

export const variables = {
  images: {
    header: '/email-header-600x250.PNG',
    headerMobile: '/email-header-600x250.PNG',
    example: '/example.jpg',
  },
  thirdpartyImages: {
    header: `${imgPath}/email-header-600x250.PNG`,
    headerMobile: `${imgPath}/email-header-600x250.PNG`,
  },
  dynamicSections: true, // import sections dynamically
};
