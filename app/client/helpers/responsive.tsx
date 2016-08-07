
export function responsive<P>(Mobile: React.ComponentClass<P>, Desktop: React.ComponentClass<P>, props: P) {
  if (document.body.clientWidth < 768) {
    return <Mobile {...props} />;
  }

  return <Desktop {...props} />;
}

export function responsiveComponent<P>(Mobile: React.ComponentClass<P>, Desktop: React.ComponentClass<P>): React.ComponentClass<P> {
  return class extends React.Component<P, void> {
    render() {
      return responsive(Mobile, Desktop, this.props);
    }
  }
}

