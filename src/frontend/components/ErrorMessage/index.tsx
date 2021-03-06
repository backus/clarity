import * as React from 'react'


export const ErrorMessage = ({msg, id}: {msg: string|null, id: string}) => (
  <div>
    <div className='pt-callout pt-intent-danger' id={id}>
      {msg}
    </div>
    <br />
  </div>
)
