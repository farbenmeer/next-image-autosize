# next-image-autosize
A wrapper around [next/image](https://nextjs.org/docs/api-reference/next/image) that automatically sets `width` and `height`.

This is useful in testing and development-environments where `next-image-loader` is not available (e.G. [storybook](https://storybook.js.org/)).
It will render a next/image without knowing the `width` and `height` beforehand by rendering a plain `<img>` first, then reading out the image dimensions and replacing the `<img>` with next/image.

## Warning
*DO NOT USE THIS IN PRODUCTION*
It will cause layout shift on two subsequent renders.

## Usage

### Storybook
```js
// .storybook/preview.js
import * as NextImage from 'next/image'
import NextImageFromFile from 'next-image-from-file'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: NextImageFromFile
})
```
