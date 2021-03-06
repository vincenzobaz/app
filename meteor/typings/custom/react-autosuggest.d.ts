
declare module "react-autosuggest" {

  export interface AutosuggestProps {
    focusInputOnSuggestionClick?: boolean;
    onSuggestionsUpdateRequested?: Function;
    shouldRenderSuggestions?: Function;
    onSuggestionSelected?: Function;
    getSuggestionValue?: Function;
    renderSuggestion?: Function;
    suggestions?: any[];
    inputProps?: Object;
    theme?: Object;
  }

  export default class Autosuggest extends React.Component<AutosuggestProps, {}>{}
}

