import { Collapse } from 'antd';
import { ProfileSettingType } from 'components/Settings/ProfileSettings/ProfileSettings';
import React, { FC, memo } from 'react';

const { Panel } = Collapse;

export const CustomPanel: FC<ProfileSettingType> = ({ header, children, className, ...props }) => {
  return (
    <Panel header={header} {...props} key={header?.toString() || ''} className={className}>
      {children}
    </Panel>
  );
};

export default memo(CustomPanel);
