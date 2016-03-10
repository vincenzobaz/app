
'use strict';

// TODO: Take an option object rather than many arguments.
// TOOD: Let caller choose if rounded or not.
export function renderIcon(icon, maxWidth, maxHeight) {

  if (typeof icon == 'string') {
    icon = {
      url: icon
    };
  }

  icon.width = Math.max(icon.width || 0, maxWidth || 0);
  icon.height = Math.max(icon.height || 0, maxHeight || 0);

  return <img className="media-object img-circle"
              width={icon.width}
              height={icon.height}
              src={icon.url}
              alt="" />;
}

