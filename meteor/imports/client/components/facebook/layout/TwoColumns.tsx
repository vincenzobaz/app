
interface TwoColumnsProps {
  children?: any[];
}

export class TwoColumns extends React.Component<TwoColumnsProps, {}> {

  render() {
    const left  = this.props.children[0];
    const right = this.props.children[1];

    if (left == null) {
      return (right != null) ? this.renderContent(right) : <noscript />;
    }

    if (right == null) {
      return this.renderContent(left);
    }

    return (
      <div className="layout-2cols container-fluid">
        <div className="layout-col-left grid-30">
          {left}
        </div>
        <div className="layout-col-right grid-70">
          {right}
        </div>
      </div>
    );
  }

  renderContent(content) {
    if (typeof content === 'string') {
      return <span>{content}</span>;
    }

    return content;
  }

}

