declare module "react-typeahead" {
  
  export interface TypeaheadProps {
    name?: string;
    customClasses?: Object;
    maxVisible?: number;
    options?: any[];
    allowCustomValues?: number;
    defaultValue?: string;
    value?: string;
    placeholder?: string;
    textarea?: boolean;
    inputProps?: Object;
    onOptionSelected?: Function;
    onChange?: Function;
    onKeyDown?: Function;
    onKeyUp?: Function;
    onFocus?: Function;
    onBlur?: Function;
    filterOption?: string | Function;
    displayOption?: string | Function;
    formInputOption?: string | Function;
    defaultClassNames?: boolean;
    customListComponent?: JSX.Element | Function;
    className?: string;
  }
  
  export class Typeahead extends React.Component<TypeaheadProps, {}>{}
}
