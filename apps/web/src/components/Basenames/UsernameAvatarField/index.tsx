import Fieldset from 'apps/web/src/components/Fieldset';
import FileInput from 'apps/web/src/components/FileInput';
import Hint, { HintVariants } from 'apps/web/src/components/Hint';
import {
  getBasenameAvatarUrl,
  getUserNamePicture,
  UsernameTextRecordKeys,
  validateAvatarUpload,
  validateBasenameAvatarUrl,
} from 'apps/web/src/utils/usernames';
import { ChangeEvent, useCallback, useEffect, useId, useRef, useState } from 'react';
import { StaticImageData } from 'next/image';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import cameraIcon from './cameraIcon.svg';
import Input from 'apps/web/src/components/Input';
import Dropdown from 'apps/web/src/components/Dropdown';
import DropdownToggle from 'apps/web/src/components/DropdownToggle';
import DropdownMenu from 'apps/web/src/components/DropdownMenu';
import DropdownItem from 'apps/web/src/components/DropdownItem';

export type UsernameAvatarFieldProps = {
  onChangeFile: (file: File | undefined) => void;
  onChange: (key: UsernameTextRecordKeys, value: string) => void;
  value: string;
  disabled?: boolean;
  username: string;
};

export default function UsernameAvatarField({
  onChangeFile,
  onChange,
  value,
  disabled = false,
  username,
}: UsernameAvatarFieldProps) {
  const [error, setError] = useState<string>();
  const [newValue, setNewValue] = useState<string>(value || '');
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File>();
  const onChangeAvatarFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const singleFile = files[0];
    if (!singleFile) return;

    setAvatarFile(singleFile);
  }, []);

  const onChangeAvatarUrl = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const avatarUrl = event.target.value;
    setNewValue(avatarUrl);
  }, []);

  const onClickFileUpload = useCallback(() => {
    setShowUrlInput(false);
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  }, []);

  const onClickSetUrl = useCallback(() => {
    setShowUrlInput(true);
  }, []);

  const onClickUseDefaultAvatar = useCallback(() => {
    setShowUrlInput(false);
    setNewValue('');
    setAvatarFile(undefined);
  }, []);

  useEffect(() => {
    if (!avatarFile) return;
    const validationResult = validateAvatarUpload(avatarFile);

    if (!validationResult.valid) {
      onChangeFile(undefined);
      setError(validationResult.message);
      return;
    } else {
      onChangeFile(avatarFile);
      return setError('');
    }
  }, [avatarFile, onChangeFile]);

  useEffect(() => {
    if (newValue.trim() === '') {
      onChange(UsernameTextRecordKeys.Avatar, newValue.trim());
      setError('');
      return;
    }

    const validationResult = validateBasenameAvatarUrl(newValue);
    if (!validationResult.valid) {
      if (onChange) onChange(UsernameTextRecordKeys.Avatar, value);
      setError(validationResult.message);
      return;
    } else {
      if (onChange) onChange(UsernameTextRecordKeys.Avatar, newValue);
      return setError('');
    }
  }, [newValue, onChange, value]);

  const usernameAvatarFieldId = useId();

  const defaultSelectedProfilePicture = getUserNamePicture(username);
  const newAvatarFileUrl = avatarFile && !error ? URL.createObjectURL(avatarFile) : undefined;
  const newAvatarUrl = !error ? getBasenameAvatarUrl(newValue) : undefined;
  const avatarSrc =
    newAvatarFileUrl ??
    newAvatarUrl ??
    getBasenameAvatarUrl(newValue) ??
    defaultSelectedProfilePicture;

  return (
    <Fieldset>
      <div className="relative w-[10rem] min-w-[10rem]">
        <ImageWithLoading
          src={avatarSrc}
          alt={username}
          wrapperClassName="rounded-full h-[10rem] max-h-[10rem] min-h-[10rem] w-[10rem] min-w-[10rem] max-w-[10rem] border-4 border-white "
          backgroundClassName="bg-blue-500"
          imageClassName="object-cover h-full w-full"
          width={320}
          height={320}
        />

        <span className="absolute bottom-0 right-0 hover:cursor-pointer">
          <Dropdown>
            <DropdownToggle>
              <ImageWithLoading src={cameraIcon as StaticImageData} alt="Upload an avatar" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={onClickFileUpload}>
                Upload File
                <FileInput
                  id={usernameAvatarFieldId}
                  onChange={onChangeAvatarFile}
                  disabled={disabled}
                  className="hidden"
                  ref={avatarInputRef}
                />
              </DropdownItem>
              <DropdownItem onClick={onClickSetUrl}>Set URL</DropdownItem>
              <DropdownItem onClick={onClickUseDefaultAvatar}>Use default avatar</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </span>
      </div>
      {showUrlInput && (
        <Input
          type="text"
          value={newValue}
          onChange={onChangeAvatarUrl}
          className="flex-1 rounded-md border border-gray-40/20 p-2 text-black"
        />
      )}

      {error && <Hint variant={HintVariants.Error}>{error}</Hint>}
    </Fieldset>
  );
}
