const imgPath = `/assets/${localStorage.getItem('lastSelectedEmailId')}/images`;

export const variables = {
  images: {
    header: `${imgPath}/email-header-600x250.PNG`,
    headerMobile: `${imgPath}/email-header-600x250.PNG`,
    example: `${imgPath}/example.jpg`,
  },
  dynamicSections: true, // import sections dynamically
};
