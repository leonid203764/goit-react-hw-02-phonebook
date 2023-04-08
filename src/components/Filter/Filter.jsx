import React from 'react';

import { Input, Label } from './Filter.style';

export const Filter = ({ value, onChange }) => {
  return (
    <Label>
      Find contacts by name:
      <Input type="text" value={value} onChange={onChange} />
    </Label>
  );
};
