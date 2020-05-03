import React from 'react';
import { Icon } from 'react-native-elements';
import { HeaderButton } from 'react-navigation-header-buttons';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton IconComponent={Icon} iconSize={props.size || 25} {...props} />
  );
};

export default CustomHeaderButton;
