import type { ChangeEvent, FC } from 'react';
import React from 'react';
import { styled } from '@storybook/theming';
import { Form } from '@storybook/components';

import type { ControlProps } from './types';
import { getControlId } from './helpers';

export interface FilesControlProps extends ControlProps<string[]> {
  /**
   * The accept attribute value is a string that defines the file types the file input should accept. This string is a comma-separated list of unique file type specifiers.
   * @example
   * *\/*
   * @example
   * .webm,video/webm
   * @example
   * .doc,.docx,application/msword
   * @defaultValue `image/*`
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   */
  accept?: string;
}

const FileInput = styled(Form.Input)({
  padding: 10,
});

function revokeOldUrls(urls: string[]) {
  urls.forEach((url) => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  });
}

export const FilesControl: FC<FilesControlProps> = ({
  onChange,
  name,
  accept = 'image/*',
  value,
}) => {
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const fileUrls = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    onChange(fileUrls);
    revokeOldUrls(value);
  }

  return (
    <FileInput
      id={getControlId(name)}
      type="file"
      name={name}
      multiple
      onChange={handleFileChange}
      accept={accept}
      size="flex"
    />
  );
};