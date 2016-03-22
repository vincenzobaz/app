import {Item} from "../../../common/models/questions/common/Item";
import {Motion, spring} from 'react-motion';
import {SpringHelperConfig} from "react-motion";

const defaultItemHeight = 30;

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

interface SortableListProps {
  items?: Item[];
  onSort?: Function;
  renderItem?: Function;
}

const springConfig: SpringHelperConfig = {stiffness: 300, damping: 50};


interface SortableListState {
  items?: Item[];
  delta?: number;
  mouse?: number;
  isPressed?: boolean;
  lastPressed?: number;
  order?: number[];
  itemHeight?: number[];
  orderedOffset?: number[];
  orderedHeight?: number[];
  itemComponents?: React.ReactHTMLElement[];
  calibrationComplete?: boolean;
}

export class SortableList extends React.Component<SortableListProps, SortableListState> {

  constructor(props: SortableListProps) {
    super(props);
    this.state = {
      items: this.props.items,
      delta: 0,
      mouse: 0,
      isPressed: false,
      lastPressed: 0,
      order: _.range(this.props.items.length),
      itemHeight: this.props.items.map((i) => {
        return defaultItemHeight;
      }),
      orderedOffset: this.props.items.map((i) => {
        return 0
      }),
      orderedHeight: this.props.items.map((i) => {
        return 0
      }),
      itemComponents: this.props.items.map((i) => {
        return null
      }),
      calibrationComplete: false
    };
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    let itemsHeight = this.state.itemComponents.map(item => {
      return $(item).outerHeight(true)
    });
    this.setState({
      calibrationComplete: true,
      itemHeight: itemsHeight,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }


  handleTouchStart = (key, pressLocation, e): void => {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  };


  handleTouchMove = (e: TouchEvent): void => {
    e.preventDefault();
    this.handleMove(e.touches[0].pageY);
  };

  handleMouseDown = (pos, pressY, {pageY}): void => {

   
    let topOffset = this.state.itemComponents.map((item: React.ReactHTMLElement) => {
      return $(item).offset().top;
    });

    let orderedOffset = this.state.order.map((i) => {
      return topOffset[i]
    });

    let orderedHeight = this.state.order.map((i) => {
      return this.state.itemHeight[i]
    });
    this.setState({
      delta: pageY - pressY,
      mouse: pressY,
      isPressed: true,
      lastPressed: pos,
      orderedOffset: orderedOffset,
      orderedHeight: orderedHeight,
    });
  };


  handleMouseMove = (e: MouseEvent): void => {
    this.handleMove(e.pageY);

  };

  handleMove(pageY: number) {
    const {isPressed, delta, order, lastPressed} = this.state;
    if (isPressed) {
      const mouse = pageY - delta;
      const row = this.getRow(pageY);
      const newOrder = reinsert(order, order.indexOf(lastPressed), row);
      this.setState({mouse: mouse, order: newOrder});
    }
  }

  getRow(mouseY: number): number {
    let offset = this.state.orderedOffset;
    let height = this.state.orderedHeight;
    for (let i: number = 0; i < offset.length; i++) {
      if (mouseY > offset[i] && mouseY < (offset[i] + height[i])) {
        return i;
      }
    }

    /**
     *  If it the pointer is above any item we put it in the first row,
     *  If it is below all items we put it in the last
     */

    if (offset[0] && mouseY <= offset[0]) {
      return 0;
    } else {
      return offset.length - 1;
    }


  }

  handleMouseUp = (): void => {
    this.setState({isPressed: false, delta: 0});
  };

  componentWillReceiveProps(props) {
    this.setState({
      items: this.props.items,
      calibrationComplete: false
    });
  }


  render() {
    const {mouse, isPressed, lastPressed, order} = this.state;
    const items = this.state.items;
    const totalHeight = this.state.itemHeight.reduce((acc, h) => {
      return acc + h
    });
    let divStyle = {
      height: totalHeight + "px",
      overflow: "auto",
      width: "100%"
    };
    if (this.state.calibrationComplete) {
      return (
          <div style={divStyle}>
            {items.map(item => {
              const i = items.indexOf(item);
              const orderIndex = order.indexOf(i);
              const style = lastPressed === i && isPressed
                  ? {
                scale: spring(1.1, springConfig),
                shadow: spring(16, springConfig),
                y: mouse,
              }
                  : {
                scale: spring(1, springConfig),
                shadow: spring(1, springConfig),
                y: spring(this.getHeightUpToItem(orderIndex, order), springConfig),
              };
              return (
                  <Motion style={style} key={i}>
                    {({scale, shadow, y}) =>
                        <div
                            ref={this.setItemHeight.bind(this, i)}
                            onMouseDown={this.handleMouseDown.bind(this, i, y)}
                            onTouchStart={this.handleTouchStart.bind(this, i, y)}
                            className="demo8-item"
                            style={{
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: i === lastPressed ? 99 : i,
                  }}>
                          {this.renderItem(item)}
                        </div>
                    }
                  </Motion>
              );
            })}
          </div>
      );
    }
    else {

      return (
          <div className="demo8">
            {items.map((item, i: number) => {
              return <div key={_.uniqueId()} className="demo8-item-static" >
                {this.renderItem(item)}
              </div>
            })}
          </div>
      );

    }

  }

  getHeightUpToItem(orderIndex: number, order: number[]): number {
    let acc: number = 0;

    for (let i = 0; i < orderIndex; i++) {
      let itemIndex: number = order[i];
      acc += this.state.itemHeight[itemIndex];
    }
    return acc;
  }

  renderItem(item) {

    return (
        <div
            key={item.id}>
          {this.props.renderItem(item)}
        </div>
    );
  }

  setItemHeight(index: number, itemComponent: any) {
    if (!itemComponent) {
      return;
    }
    if (!this.state.itemComponents[index]) {
      let items: React.ReactHTMLElement[] = this.state.itemComponents;
      items[index] = itemComponent;
      this.setState({
        itemComponents: items,
      });

    }
    let itemsHeight: number[] = this.state.itemHeight;
    let height = $(itemComponent).outerHeight(true);
    let changedHeight = itemsHeight[index] != height;
    
    if (changedHeight) {
      console.log("we height changed for ", index);
    
      itemsHeight[index] = height;
      this.setState({
        itemHeight: itemsHeight,
      });
    }
  }


}


