export const themes = (
  theme: 'white' | 'black' | 'yellow' | 'whiteStroke' | 'blackStroke',
  backgroundOverride?: string,
  groupName?: string,
) => {
  if (backgroundOverride) {
    switch (theme) {
      case 'white':
        return `bg-${backgroundOverride} hover:bg-${backgroundOverride}-active group-hover/${groupName}:bg-${backgroundOverride}-active active:bg-${backgroundOverride}-active border-${backgroundOverride} hover:border-${backgroundOverride}-active group-hover/${groupName}:border-${backgroundOverride}-active active:border-${backgroundOverride}-active border border-solid text-black disabled:bg-pearl disabled:text-grey disabled:border-pearl`;
      case 'black':
        return `bg-${backgroundOverride} hover:bg-${backgroundOverride}-active group-hover/${groupName}:bg-${backgroundOverride}-active active:bg-${backgroundOverride}-active border-${backgroundOverride} hover:border-${backgroundOverride}-active group-hover/${groupName}:border-${backgroundOverride}-active active:border-${backgroundOverride}-active border border-solid text-white disabled:bg-pearl disabled:text-grey disabled:border-pearl`;
      default:
        break;
    }
  }

  switch (theme) {
    case 'white':
      return `bg-white hover:bg-white-active active:bg-white-active border border-solid border-white hover:border-white-active active:border-white-active text-black disabled:bg-pearl disabled:text-grey disabled:border-pearl ${
        groupName
          ? `group-hover/${groupName}:bg-white-active group-hover/${groupName}:border-white-active`
          : 'group-hover:bg-white-active group-hover:border-white-active'
      } `;
    case 'black':
      return `bg-black hover:bg-black-active active:bg-black-active border border-solid border-black hover:border-black-active active:border-black-active text-white disabled:bg-pearl disabled:text-grey disabled:border-pearl ${
        groupName
          ? `group-hover/${groupName}:bg-black-active group-hover/${groupName}:border-black-active`
          : 'group-hover:bg-black-active group-hover:border-black-active'
      } `;
    case 'whiteStroke':
      return `bg-transparent hover:bg-white active:bg-white border border-solid border-white text-white hover:text-black active:text-black disabled:text-grey disabled:border-grey ${
        groupName
          ? `group-hover/${groupName}:bg-white group-hover/${groupName}:text-black`
          : 'group-hover:bg-white group-hover:text-black'
      }`;
    case 'blackStroke':
      return `bg-transparent hover:bg-black active:bg-black border border-solid border-black text-black hover:text-white active:text-white disabled:text-grey disabled:border-grey ${
        groupName
          ? `group-hover/${groupName}:bg-black group-hover/${groupName}:text-white`
          : 'group-hover:bg-black group-hover:text-white'
      }`;
    default:
      return `bg-saffron hover:bg-saffron-active active:bg-saffron-active border border-solid border-saffron hover:border-saffron-active active:border-saffron-active text-black disabled:bg-pearl disabled:text-grey disabled:border-pearl ${
        groupName
          ? `group-hover/${groupName}:bg-saffron-active group-hover/${groupName}:border-saffron-active`
          : 'group-hover:bg-saffron-active group-hover:border-saffron-active'
      }`;
  }
};
