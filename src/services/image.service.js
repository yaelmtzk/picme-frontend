export const iconImgs = import.meta.glob('/src/assets/img/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
})

const iconImgList = Object.values(iconImgs)

export function getIconImg(fileName) {
  return iconImgList.find(imgSrc => imgSrc.includes(fileName))
}
