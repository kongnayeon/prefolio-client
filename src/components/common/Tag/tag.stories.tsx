import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tag } from '.';
import React from 'react';

export default {
  title: 'Tag',
  component: Tag,
  argTypes: {},
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'activity',
  sort: 'SOCIETY',
};

export const Plan = Template.bind({});
Plan.args = {
  type: 'field',
  sort: 'PLAN',
};

export const Dev = Template.bind({});
Dev.args = {
  type: 'field',
  sort: 'DEV',
};

export const Design = Template.bind({});
Design.args = {
  type: 'field',
  sort: 'DESIGN',
};
