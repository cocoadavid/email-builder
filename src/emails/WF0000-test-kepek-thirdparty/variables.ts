const imgPath = `/emails/${localStorage.getItem("lastSelectedEmailId")}/images`

export const variables = {
    images: {
        header: '/emailheader.jpg',
    },
    thirdpartyImages: {
       header: `${imgPath}/test.png`,
    }
}