import * as React from 'react'
import {randomStr} from '~/../utils/test/string'

const s = require('./styles.css')

const Truncated = ({text, hideToggle}: {text: string; hideToggle?: boolean}) => {
  const id = randomStr()
  return (
    <div className={hideToggle ? s['with-ellipsis'] : ''}>
      <input type="checkbox" className={s['read-more-state']} id={id} />

      <p className={s['read-more-wrap']}>
        {text}
      </p>
      {!hideToggle && <label htmlFor={id} className={s['read-more-trigger']} />}
    </div>
  )
}

export default Truncated
