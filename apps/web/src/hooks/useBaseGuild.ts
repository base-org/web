import { useQuery } from '@tanstack/react-query';

const BASE_GUILD_ID = 20111;

export type GuildBadges =
  | 'BASE_BUILDER'
  | 'BUILDATHON_PARTICIPANT'
  | 'BASE_INITIATE'
  | 'BASE_LEARN_NEWCOMER'
  | 'BASE_GRANTEE'
  | 'BUILDATHON_WINNER';

const ROLE_ID_TO_BADGE: Record<number, GuildBadges> = {
  116358: 'BASE_BUILDER',
  140283: 'BUILDATHON_PARTICIPANT',
  116357: 'BASE_INITIATE',
  120420: 'BASE_LEARN_NEWCOMER',
};

type Memberships = {
  roles: {
    roleId: number;
    access: boolean;
  }[];
};

export function useBaseGuild(address?: `0x${string}`) {
  const query = useQuery<Memberships>({
    queryKey: ['guild'],
    queryFn: async () => {
      const profile = await fetch(
        `https://api.guild.xyz/v2/users/${address}/memberships?guildId=${BASE_GUILD_ID}`,
      );
      const data = await profile.json();
      return data as Memberships;
    },
    enabled: !!address,
  });

  const badges = [];
  if (query.data) {
    // push badge for each role they've got
    for (const role of query.data.roles) {
      if (role.access && role.roleId in ROLE_ID_TO_BADGE) {
        badges.push(ROLE_ID_TO_BADGE[role.roleId]);
      }
    }
  }

  return badges;
}
