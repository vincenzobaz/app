
'use strict';

import {JoinRequestStore} from './../stores/JoinRequestStore';
import * as Model from "../models/JoinRequest";

interface JoinRequestProps {
  request: Model.JoinRequest;
}

export class JoinRequest extends React.Component<JoinRequestProps, {}> {

  constructor(props: JoinRequestProps) {
    super(props);
  }

  render() {
    const from      = this.props.request.from;
    const avatarUrl = from != null ? from.avatarUrl : '';
    const name      = from != null ? from.name: 'Loading...';

    return (
      <li className='waiting'>
        <div className='media'>
          <a className='pull-left' title='Switch to this game' onClick={this.accept.bind(this)}>
            <img className='media-object img-circle' width='40' src={avatarUrl} alt='' />
          </a>
          <div className='media-body'>
            <h5 className='media-heading'>
              {name}
            </h5>
            <div className="waiting-actions">
              <button className='btn btn-xs btn-success' onClick={this.accept.bind(this)}>ACCEPT</button>
              <small> or <a href='' onClick={this.decline.bind(this)}>decline</a></small>
            </div>
          </div>
        </div>
      </li>
    );
  }

  accept(e) {
    e.preventDefault();
    JoinRequestStore.accept(this.props.request);
  }

  decline(e) {
    e.preventDefault();
    JoinRequestStore.decline(this.props.request);
  }

}

export const None = React.createClass({
  render() {
    var center = {textAlign: 'center'};
    return (
      <li>
        <div className='media'>
          <div className='media-body' style={center}>
            No join requests
          </div>
        </div>
      </li>
    );
  }
});

