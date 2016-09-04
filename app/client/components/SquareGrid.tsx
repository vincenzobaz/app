
import { chunk } from 'lodash';

interface Props {
  cells: any[]
}

export class SquareGrid extends React.Component<Props, void> {

  render() {
    const { cells } = this.props;
    const dimension = Math.sqrt(cells.length);
    const rows      = chunk(cells, dimension);

    return (
      <div className="square-container">
        <div className="square-content">
          {rows.map(cols =>
            <div className="square-row">
              {cols.map(col =>
                <div className="square-col">
                  {col}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

}

