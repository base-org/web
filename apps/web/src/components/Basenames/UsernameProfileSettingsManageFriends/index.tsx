'use client';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useErrors } from 'apps/web/contexts/Errors';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import FriendSearchInput from 'apps/web/src/components/Basenames/FriendSearchInput';
import { FriendSearchInputVariant } from 'apps/web/src/components/Basenames/FriendSearchInput/types';
import { useReadFollows } from 'apps/web/src/hooks/useReadFollows';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { useAddFollowsCallback } from 'apps/web/src/hooks/useAddFollows';

const settingTabClass = classNames(
  'flex flex-col justify-between gap-8 text-gray/60 md:items-center p-4 md:p-8',
);

export default function UsernameProfileSettingsManageProfile() {
  const { profileUsername, profileAddress, currentWalletIsProfileEditor, setShowProfileSettings } =
    useUsernameProfile();
  const { data: follows, ...rest } = useReadFollows(profileUsername);
  const { callback: addFollows, ...addFollowsRest } = useAddFollowsCallback(profileUsername);

  // const [friends, setFriends] = useState<string[]>(['test.basetest.eth', 'test2.basetest.eth']);
  const { data: friends, ...friendsRest } = useReadFollows(profileUsername);
  console.log({ friends, friendsRest });

  const onSubmit = useCallback((name: string) => {
    // setFriends((prev) => [...prev, name]);
  }, []);

  const removeFriend = useCallback(
    (name: string) => {
      void addFollows([name]).then(() => {
        // setFriends((prev) => prev.filter((friend) => friend !== name));
      });
    },
    [addFollows],
  );

  return (
    <>
      <section className={settingTabClass}>
        <FriendSearchInput
          variant={FriendSearchInputVariant.Small}
          placeholder="Search for a friend"
          onSubmit={onSubmit}
        />
      </section>
      <div className="md:p-center flex flex-col justify-between gap-4 border-t border-[#EBEBEB] p-4 md:p-8">
        {friends?.map((follow) => (
          <FriendDisplay key={follow} friend={follow} removeFriend={removeFriend} />
        ))}
      </div>
    </>
  );
}

function FriendDisplay({
  friend,
  removeFriend,
}: {
  friend: string;
  removeFriend: (name: string) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <div>{friend}</div>
      <button
        type="button"
        onClick={() => removeFriend(friend)}
        className="h-8 w-8 rounded-full bg-red-50 text-white"
      >
        X
      </button>
    </div>
  );
}
