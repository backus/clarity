import * as React from 'react'
import {UserInstance} from '~/server/db/models/user'
import * as api from '~/frontend/api'
import Truncated from '~/frontend/components/Truncated'

const s = require('./styles.css')

const ParentTest = () =>
  <div>
    <div className={s['parent']}>
      This is outside <span className={s['badge']}>{s['parent']}</span>
      <div className={s['inner']}>
        This is inside <span className={s['badge']}>{s['inner']}</span>
      </div>
      <div className="inner">
        This is inside <span className={s['badge']}>inner</span>
      </div>
    </div>
  </div>

class Component extends React.Component<{}, {users?: UserInstance[]}> {
  state = {users: undefined}

  async retrieveUsers() {
    const users: UserInstance[] = await api.getUsers()
    this.setState({users})
  }

  componentDidMount() {
    this.retrieveUsers()
  }

  render() {
    const str =
      `Lorem ipsum dolor sit amet, consectetur adipisicing elit. ` +
      `Libero fuga facilis vel consectetur quos sapiente deleniti eveniet ` +
      `dolores tempore eos deserunt officia quis ab? Excepturi vero tempore ` +
      `minus beatae voluptatem! \n` +
      `Lorem ipsum dolor sit amet, consectetur adifpisicing elit. ` +
      `Libero fuga facilis vel consectetur quos sapiente deleniti eveniet ` +
      `dolores tempore eos deserunt officia quis ab? ` +
      `Lorem ipsum dolor sit amet, consectetur adifpisicing elit. ` +
      `Libero fuga facilis vel consectetur quos sapiente deleniti eveniet ` +
      `dolores tempore eos deserunt officia quis ab? ` +
      `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`

    return (
      <div>
        <h2>
          Truncated
        </h2>
        <Truncated text={str} />
        <br />
        <Truncated hideToggle text={str} />
        <br />
        <h2>
          Users
        </h2>
        <pre className={s['pre']}>
          {this.state.users
            ? JSON.stringify(this.state.users, null, 2)
            : 'Retrieving users...'}
        </pre>

        <br />

        <h2>
          Parent/Child Test
        </h2>
        <ParentTest />
      </div>
    )
  }
}
export default Component
