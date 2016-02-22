import {capitalize} from './capitalize.jsx';


export const assignProps = (obj, propNames, props) => {
    if (props == null || typeof props !== 'object') {
        return;
    }

    for (let propName of propNames) {
      if (!props.hasOwnProperty(propName)) {
            continue;
        }

        const methodName = `set${capitalize(propName)}`;
        if (typeof obj[methodName] === 'function') {
            obj[methodName](props[propName]);
        } else {
            obj[propName] = props[propName];
        }
    }
};

