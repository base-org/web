import Fieldset from 'apps/web/src/components/Fieldset';
import FileInput from 'apps/web/src/components/FileInput';
import Hint, { HintVariants } from 'apps/web/src/components/Hint';
import Label from 'apps/web/src/components/Label';
import { getUserNamePicture } from 'apps/web/src/utils/usernames';
import { ChangeEvent, useCallback, useEffect, useId, useState } from 'react';
import {
  ALLOWED_IMAGE_TYPE,
  MAX_IMAGE_SIZE_IN_MB,
} from 'apps/web/pages/api/basenames/avatar/upload';
import Image, { StaticImageData } from 'next/image';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import cameraIcon from './cameraIcon.svg';

export type UsernameAvatarFieldProps = {
  onChange: (file: File | undefined) => void;
  value: string;
  disabled?: boolean;
  username: string;
};

export function validateAvatarUpload(file: File) {
  if (!ALLOWED_IMAGE_TYPE.includes(file.type)) {
    return {
      valid: false,
      message: 'Only supported image are PNG, SVG, JPEG & WebP',
    };
  }
  const bytes = file.size;
  const bytesToMegaBytes = bytes / (1024 * 1024);

  if (bytesToMegaBytes > MAX_IMAGE_SIZE_IN_MB) {
    return {
      valid: false,
      message: 'Max image size is 1Mb',
    };
  }

  // TODO: Validate a square-ish image, with a width/height ratio of minimum 0.8
  return {
    valid: true,
    message: '',
  };
}

export default function UsernameAvatarField({
  onChange,
  value,
  disabled = false,
  username,
}: UsernameAvatarFieldProps) {
  const [error, setError] = useState<string>();
  const [avatarFile, setAvatarFile] = useState<File>();
  const onChangeAvatar = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const singleFile = files[0];
    if (!singleFile) return;

    setAvatarFile(singleFile);
  }, []);

  useEffect(() => {
    if (!avatarFile) return;
    const validationResult = validateAvatarUpload(avatarFile);

    if (!validationResult.valid) {
      onChange(undefined);
      setError(validationResult.message);
      return;
    } else {
      onChange(avatarFile);
      return setError('');
    }
  }, [avatarFile, onChange]);

  const usernameAvatarFieldId = useId();

  const defaultSelectedProfilePicture = getUserNamePicture(username);
  const currentAvatar = value; // TODO: parse IPFS

  const avatarSrc =
    avatarFile && !error
      ? URL.createObjectURL(avatarFile)
      : currentAvatar || defaultSelectedProfilePicture;

  return (
    <Fieldset>
      <Label htmlFor={usernameAvatarFieldId} className="group relative inline-block max-w-[10rem]">
        <ImageWithLoading
          src={avatarSrc}
          alt={username}
          wrapperClassName="rounded-full h-[10rem] max-h-[10rem] min-h-[10rem] w-[10rem] min-w-[10rem] max-w-[10rem] border-4 border-white group-hover:border-blue-500"
          backgroundClassName="bg-blue-500"
          imageClassName="object-cover h-full w-full"
          width={320}
          height={320}
        />
        <Image
          src={cameraIcon as StaticImageData}
          alt="Upload an avatar"
          className="absolute bottom-0 right-0"
        />
        <FileInput
          id={usernameAvatarFieldId}
          onChange={onChangeAvatar}
          disabled={disabled}
          className="hidden"
        />
      </Label>
      {error && <Hint variant={HintVariants.Error}>{error}</Hint>}
    </Fieldset>
  );
}
