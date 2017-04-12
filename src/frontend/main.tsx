import * as React    from 'react'
import * as ReactDOM from 'react-dom'
import * as fetch    from 'isomorphic-fetch'
import { Counter }   from '~/frontend/stories/Counter'

export async function getData() {
  return fetch('/data')
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root'),
)

getData().then((res: any) => {
  if (res.ok) {
    res.json().then((r: any) => {
      console.log(r)
    })
  } else {
    return res.json().then(console.log)
  }
})
