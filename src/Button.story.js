/**
 * @flow
 */

import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Button from './Button';
import I18N from './I18N';

export function createButtonStories(Button: any) {
  storiesOf(`<${Button.displayName || Button.name} />`, module)
    .add('Default state', () =>
      <Button>Click me</Button>
    )
    .add('Size: x-small', () =>
      <Button size="x-small">Click me</Button>
    )
    .add('Size: small', () =>
      <Button size="small">Click me</Button>
    )
    .add('Size: normal', () =>
      <Button size="normal">Click me</Button>
    )
    .add('Size: large', () =>
      <Button size="large">Click me</Button>
    )
    .add('With icon', () =>
      <Button icon="+">Add</Button>
    )
    .add('With icon (alternative)', () =>
      <Button iconAlt="+">Add</Button>
    )
    .add('Grouped horizontally', () =>
      <div>
        <Button groupHorizontally>Add</Button>
        <Button groupHorizontally>Remove</Button>
      </div>
    )
    .add('Grouped horizontally (rtl)', () =>
      <I18N dir="rtl">
        <div>
          <Button groupHorizontally>Add</Button>
          <Button groupHorizontally>Remove</Button>
        </div>
      </I18N>
    )
    .add('Grouped vertically', () =>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Button groupVertically>Add</Button>
        <Button groupVertically>Remove</Button>
      </div>
    );
}

createButtonStories(Button);
