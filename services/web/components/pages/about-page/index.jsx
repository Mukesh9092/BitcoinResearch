import React from 'react'
import { css } from 'emotion'

const containerClassName = css`
  background-color: #00ff00;
`

const headerClassName = css``

const paragraphClassName = css``

export const Component = () => (
  <div className={containerClassName}>
    <h1 className={headerClassName}>About</h1>
    <p className={paragraphClassName}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut
      sollicitudin orci. Ut aliquet ante et metus ultrices tincidunt.
      Aliquam venenatis maximus aliquam. Aliquam nulla elit, scelerisque
      eget dapibus a, porta vel dui. In pellentesque nunc ac quam rutrum,
      non dapibus urna scelerisque. Nam blandit lobortis metus eget
      gravida. Nulla eget urna sed diam commodo iaculis. Duis porta tortor
      placerat urna scelerisque pulvinar. Orci varius natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Phasellus et
      consequat dolor. Curabitur blandit vitae augue vitae pulvinar.
      Praesent mollis nibh ante, id efficitur purus iaculis a. Mauris
      iaculis, eros ut finibus consequat, tellus risus tincidunt sapien, a
      aliquet quam nunc nec leo. Proin iaculis sit amet ex a fermentum.
    </p>
  </div>
)

export default Component
