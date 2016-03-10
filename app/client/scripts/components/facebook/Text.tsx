interface TextProps {
  text: string;
}
export class Text extends React.Component<TextProps, {}> {

  render() {
    return (
        <div className="post post-text">
          <blockquote>{this.props.text}</blockquote>
        </div>
    );
  }

}
