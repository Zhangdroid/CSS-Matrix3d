# CSS-Matrix3d

## Install

```shell
yarn add css-matrix3d

#or

npm install css-matrix3d --save
```
## Usage

```js
import { scale, translate, rotate, generateMatrix, generateCSS } from 'css-matrix3d'

const css = generateCSS(scale(2,2), translate(50, 50, 50), rotate('x', 30))

// Will get 'matrix3d(2,0,0,0,0,-1.8243761378545968,0.8195435971482816,0,0,-0.4097717985741408,-0.9121880689272984,0,50,50,50,1)'

```
