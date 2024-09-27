import { useCallback, useEffect, useMemo, useState } from 'react';
import CalendarHeatmap, { ReactCalendarHeatmapValue } from 'react-calendar-heatmap';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import './cal.css';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import {
  bridges,
  lendBorrowEarn,
} from 'apps/web/src/components/Basenames/UsernameProfileSectionHeatmap/contracts';
import { Address } from 'viem';

type HeatmapValue = {
  date: string;
  count: number;
};

type Transaction = {
  timeStamp: string;
  from: string;
  to: string;
  functionName?: string;
  input: string;
  hash: string;
};

type TalentProtocolData = {
  passport: {
    score: number;
    passport_socials: {
      source: string;
      profile_url: string;
      profile_image_url: string;
      profile_display_name: string;
    }[];
    verified_wallets: string[];
    passport_profile: {
      display_name: string;
      image_url: string;
      location: string;
      bio: string;
    };
  };
};

export default function UsernameProfileSectionHeatmap() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [totalTx, setTotalTx] = useState<number>(0);
  const [tokenSwapCount, setTokenSwapCount] = useState<number>(0);
  const [ensCount, setEnsCount] = useState<number>(0);
  const [bridgeCount, setBridgeCount] = useState<number>(0);
  const [lendCount, setLendCount] = useState<number>(0);
  const [buildCount, setBuildCount] = useState<number>(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatmapValue[]>([]);
  const [uniqueActiveDays, setUniqueActiveDays] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [activityPeriod, setActivityPeriod] = useState<number>(0);
  const [credentialsScore, setCredentialsScore] = useState<number | null>(null);
  const [ethereumDeployments, setEthereumDeployments] = useState<string[]>([]);
  const [baseDeployments, setBaseDeployments] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [apiErrors, setApiErrors] = useState<Record<string, boolean>>({
    ethereum: false,
    base: false,
    sepolia: false,
  });

  const classForValue = useCallback((value: ReactCalendarHeatmapValue<string> | undefined) => {
    if (!value) return 'fill-[#ebedf0]';
    if (value.count >= 10) return 'fill-[#0052FF]';
    if (value.count >= 7) return 'fill-[#668cff]';
    if (value.count >= 4) return 'fill-[#99b3ff]';
    if (value.count >= 1) return 'fill-[#ccd9ff]';
    return 'fill-[#ebedf0]';
  }, []);

  const titleForValue = useCallback((value: ReactCalendarHeatmapValue<string> | undefined) => {
    return value ? `${value.date}: ${value.count} transactions` : '';
  }, []);

  const { profileAddress } = useUsernameProfile();

  const generateHeatmapData = (transactions: Transaction[]): HeatmapValue[] => {
    const dateMap: Record<string, HeatmapValue> = {};
    transactions.forEach((tx) => {
      const txDate = new Date(parseInt(tx.timeStamp) * 1000).toLocaleDateString();
      dateMap[txDate] = dateMap[txDate]
        ? { date: txDate, count: dateMap[txDate].count + 1 }
        : { date: txDate, count: 1 };
    });
    return Object.values(dateMap);
  };

  const calculateStreaksAndMetrics = (transactions: Transaction[], addrs: Address) => {
    const filteredTransactions = transactions.filter(
      (tx) => tx.from.toLowerCase() === addrs.toLowerCase(),
    );
    if (filteredTransactions.length === 0)
      return { uniqueActiveDays: 0, longestStreakDays: 0, currentStreakDays: 0, activityPeriod: 0 };

    const timestamps = filteredTransactions.map((tx) => parseInt(tx.timeStamp, 10));
    const firstTransactionDate = new Date(Math.min(...timestamps) * 1000);
    const lastTransactionDate = new Date(Math.max(...timestamps) * 1000);

    const uniqueActiveDaysSet = new Set(
      filteredTransactions.map((tx) => new Date(parseInt(tx.timeStamp, 10) * 1000).toDateString()),
    );

    const sortedDates = Array.from(uniqueActiveDaysSet)
      .map((dateStr) => new Date(dateStr))
      .sort((a, b) => a.getTime() - b.getTime());

    let longestStreakDays = 0;
    let streak = 0;
    for (let i = 0; i < sortedDates.length; i++) {
      if (
        i === 0 ||
        (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) / (1000 * 60 * 60 * 24) === 1
      ) {
        streak++;
      } else {
        longestStreakDays = Math.max(longestStreakDays, streak);
        streak = 1;
      }
    }
    longestStreakDays = Math.max(longestStreakDays, streak);

    return {
      uniqueActiveDays: uniqueActiveDaysSet.size,
      longestStreakDays,
      currentStreakDays:
        sortedDates[sortedDates.length - 1].toDateString() === new Date().toDateString()
          ? streak
          : 0,
      activityPeriod: Math.max(
        Math.ceil(
          (lastTransactionDate.getTime() - firstTransactionDate.getTime()) / (1000 * 60 * 60 * 24),
        ),
        1,
      ),
    };
  };

  const fetchTransactions = useCallback(
    async (apiUrl: string, retryCount = 3): Promise<Transaction[]> => {
      try {
        const response = await fetch(apiUrl);
        const json = (await response.json()) as {
          result: Transaction[];
          status: '1' | '0';
          message: string;
        };

        if (json.status === '1' && Array.isArray(json.result)) {
          return json.result;
        } else if (json.status === '0' && json.message === 'No transactions found') {
          return []; // Return an empty array for no transactions
        } else if (json.status === '0' && json.message === 'Exception') {
          if (retryCount > 0) {
            console.log(`API returned an exception. Retrying... (${retryCount} attempts left)`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return await fetchTransactions(apiUrl, retryCount - 1);
          } else {
            throw new Error(`API Error: ${json.message}`);
          }
        } else {
          console.error('Unexpected API response structure:', json);
          return [];
        }
      } catch (e) {
        console.error('Error fetching transactions:', e);
        throw e;
      }
    },
    [],
  );

  const filterTransactions = (transactions: Transaction[], addrs: string[]): Transaction[] => {
    return transactions.filter((tx) =>
      addrs.some((addr) => tx.from.toLowerCase() === addr.toLowerCase()),
    );
  };

  const calculateScore = useCallback(
    (tasksCompleted: number, transactions: Transaction[]): number => {
      const taskScore = (Math.min(tasksCompleted, 6) / 6) * 35;
      const txScore = (Math.min(totalTx, 100) / 100) * 20;
      const daysScore = (Math.min(uniqueActiveDays, 100) / 100) * 15;
      const longestStreakScore = (Math.min(longestStreak, 30) / 30) * 5;
      const currentStreakScore = (Math.min(currentStreak, 5) / 5) * 5;
      const activityPeriodScore = (Math.min(activityPeriod, 365) / 365) * 5;

      const recencyScore = calculateRecencyScore(transactions);

      return Math.round(
        taskScore +
          txScore +
          daysScore +
          longestStreakScore +
          currentStreakScore +
          activityPeriodScore +
          recencyScore,
      );
    },
    [activityPeriod, currentStreak, longestStreak, totalTx, uniqueActiveDays],
  );

  const calculateRecencyScore = (transactions: Transaction[]): number => {
    const now = Date.now();
    const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;

    const recentTransactions = transactions.filter(
      (tx) => parseInt(tx.timeStamp) * 1000 > ninetyDaysAgo,
    );
    const recentTxCount = recentTransactions.length;

    // Base score for up to 60 transactions (10 points)
    const baseScore = (Math.min(recentTxCount, 60) / 60) * 10;

    // Additional score for transactions beyond 60, up to 180 (5 points)
    const additionalScore = recentTxCount > 60 ? (Math.min(recentTxCount - 60, 120) / 120) * 5 : 0;

    // Total recency score (max 15 points)
    return baseScore + additionalScore;
  };

  const fetchData = useCallback(
    async (addrs: Address) => {
      setIsLoading(true);
      setError(null);
      setApiErrors({ ethereum: false, base: false, sepolia: false });

      try {
        const allTransactions: Transaction[] = [];
        let allEthereumDeployments: string[] = [];
        let allBaseDeployments: string[] = [];

        const [ethereumTransactions, baseTransactions, baseInternalTransactions] =
          await Promise.all([
            fetchTransactions(
              `https://api.etherscan.io/api?module=account&action=txlist&address=${addrs}&apikey=${ETH_API_KEY}`,
            ).catch(() => {
              setApiErrors((prev) => ({ ...prev, ethereum: true }));
              return [];
            }),
            fetchTransactions(
              `https://api.basescan.org/api?module=account&action=txlist&address=${addrs}&apikey=${BASE_API_KEY}`,
            ).catch(() => {
              setApiErrors((prev) => ({ ...prev, base: true }));
              return [];
            }),
            fetchTransactions(
              `https://api.basescan.org/api?module=account&action=txlistinternal&address=${addrs}&apikey=${BASE_API_KEY}`,
            ).catch(() => {
              setApiErrors((prev) => ({ ...prev, base: true }));
              return [];
            }),
          ]);

        const filteredEthereumTransactions = filterTransactions(ethereumTransactions, [addrs]);
        const filteredBaseTransactions = filterTransactions(baseTransactions, [addrs]);

        // Filter and deduplicate internal Base transactions
        const filteredBaseInternalTransactions = baseInternalTransactions
          .filter((tx) => tx.from.toLowerCase() === addrs.toLowerCase())
          .filter((tx) => !baseTransactions.some((baseTx) => baseTx.hash === tx.hash));

        allTransactions.push(
          ...filteredEthereumTransactions,
          ...filteredBaseTransactions,
          ...filteredBaseInternalTransactions,
        );

        allEthereumDeployments = [
          ...allEthereumDeployments,
          ...filteredEthereumTransactions
            .filter((tx) => tx.input?.startsWith('0x60806040'))
            .map((tx) => tx.hash),
        ];
        allBaseDeployments = [
          ...allBaseDeployments,
          ...filteredBaseTransactions
            .filter((tx) => tx.input.includes('60806040'))
            .map((tx) => tx.hash),
        ];

        if (allTransactions.length === 0) {
          setError(
            'No transactions found or there was an error fetching the data. Please try again later.',
          );
          return;
        }

        setTotalTx(allTransactions.length);
        setHeatmapData(generateHeatmapData(allTransactions));

        const {
          uniqueActiveDays: activeDays,
          longestStreakDays,
          currentStreakDays,
          activityPeriod: activity,
        } = calculateStreaksAndMetrics(allTransactions, addrs);
        setUniqueActiveDays(activeDays);
        setLongestStreak(longestStreakDays);
        setCurrentStreak(currentStreakDays);
        setActivityPeriod(activity);

        setTokenSwapCount(
          allTransactions.filter(
            (tx) =>
              (tx.functionName &&
                (tx.functionName.includes('swap') ||
                  tx.functionName.includes('fillOtcOrderWithEth') ||
                  tx.functionName.includes('proxiedSwap'))) ||
              tx.to === '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad' ||
              tx.to === '0x6cb442acf35158d5eda88fe602221b67b400be3e' ||
              tx.to === '0x1111111254eeb25477b68fb85ed929f73a960582',
          ).length,
        );

        // Modified ENS count calculation
        setEnsCount(
          allTransactions.filter((tx) =>
            [
              '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
              '0x253553366da8546fc250f225fe3d25d0c782303b',
              '0x4ccb0bb02fcaba27e82a56646e81d8c5bc4119a5',
              '0xd3e6775ed9b7dc12b205c8e608dc3767b9e5efda',
            ].includes(tx.to),
          ).length,
        );

        setBridgeCount(allTransactions.filter((tx) => bridges.has(tx.to)).length);

        setLendCount(
          allTransactions.filter(
            (tx) =>
              lendBorrowEarn.has(tx.to) || tx.from === '0x1382cff3cee10d283dcca55a30496187759e4caf',
          ).length,
        );

        setBuildCount(allEthereumDeployments.length + allBaseDeployments.length);
        setEthereumDeployments(allEthereumDeployments);
        setBaseDeployments(allBaseDeployments);

        const tasksCompleted = [
          allTransactions.length > 0,
          tokenSwapCount > 0,
          bridgeCount > 0,
          lendCount > 0,
          ensCount > 0,
          buildCount > 0,
        ].filter(Boolean).length;

        setFinalScore(calculateScore(tasksCompleted, allTransactions));
      } catch (e) {
        console.error('Error fetching data:', e);
        setError('Failed to fetch transaction data. Please try again later.');
      } finally {
        setIsLoading(false);
        setIsDataFetched(true);
      }
    },
    [
      bridgeCount,
      buildCount,
      calculateScore,
      ensCount,
      fetchTransactions,
      lendCount,
      tokenSwapCount,
    ],
  );

  const fetchTalentProtocolData = useCallback(async (addrs: Address) => {
    try {
      try {
        const response = await fetch(`https://api.talentprotocol.com/api/v2/passports/${addrs}`, {
          headers: { 'X-API-KEY': TALENT_PROTOCOL_API_KEY },
        });
        const json = await response.json();

        // Check if the response is an error
        if ((json as { error: string }).error === 'Resource not found.') {
          console.warn(`No Talent Protocol data found for address ${addrs}`);
          return;
        }

        setCredentialsScore((json as TalentProtocolData).passport.score);
      } catch (e) {
        // Handle 404 error or any other fetch error
        if (e instanceof Error && e.message.includes('404')) {
          console.warn(`No Talent Protocol data found for address ${addrs}`);
        } else {
          console.error(`Error fetching Talent Protocol data for address ${addrs}:`, e);
        }
      }
    } catch (e) {
      console.error('Error fetching Talent Protocol data:', e);
      setCredentialsScore(null);
    }
  }, []);

  useEffect(() => {
    if (!profileAddress) return;
    if (!isDataFetched) {
      void fetchData(profileAddress);
      void fetchTalentProtocolData(profileAddress);
    }
  }, [fetchData, fetchTalentProtocolData, isDataFetched, profileAddress]);

  const contractsDeployed = useMemo(() => {
    return ethereumDeployments.length + baseDeployments.length;
  }, [baseDeployments.length, ethereumDeployments.length]);

  return (
    <Collapsible.Root>
      <div>
        <h3>Onchain Score</h3>
        <div>{credentialsScore}</div>
      </div>

      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        horizontal
        values={heatmapData}
        classForValue={classForValue}
        titleForValue={titleForValue}
      />
      <Collapsible.Trigger className="flex flex-row items-center">
        <ChevronDownIcon
          className="mr-2 h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
        View details
      </Collapsible.Trigger>
      <Collapsible.Content className="flex flex-row flex-wrap items-start justify-start gap-8">
        <div className="w-28">
          <div className="text-xl font-medium text-palette-primary">{totalTx}</div>
          <p className="text-xs text-palette-foregroundMuted">Transactions on Ethereum & Base</p>
        </div>
        <div className="w-28">
          <div className="text-xl font-medium text-palette-primary">{uniqueActiveDays}</div>
          <p className="text-xs text-palette-foregroundMuted">Unique days active</p>
        </div>
        <div className="w-28">
          <div className="text-xl font-medium text-palette-primary">{longestStreak}</div>
          <p className="text-xs text-palette-foregroundMuted">Day longest streak</p>
        </div>
        <div className="w-28">
          <div className="text-xl font-medium text-palette-primary">{currentStreak}</div>
          <p className="text-xs text-palette-foregroundMuted">Day current streak</p>
        </div>
        <div className="w-28">
          <div className="text-xl font-medium text-palette-primary">{activityPeriod}</div>
          <p className="text-xs text-palette-foregroundMuted">Day activity period</p>
        </div>
        <div className="w-28">
          <div className="text-xl font-medium text-palette-primary">{tokenSwapCount}</div>
          <p className="text-xs text-palette-foregroundMuted">Token swaps performed</p>
        </div>
        <div className="w-28">
          <div className="text-xl font-medium text-palette-primary">{bridgeCount}</div>
          <p className="text-xs text-palette-foregroundMuted">Bridge transactions</p>
        </div>
        <div className="w-28">
          <div className="text-xl font-medium text-palette-primary">{lendCount}</div>
          <p className="text-xs text-palette-foregroundMuted">Lend/borrow/stake transactions</p>
        </div>
        <div className="w-28">
          <div className="text-xl font-medium text-palette-primary">{ensCount}</div>
          <p className="text-xs text-palette-foregroundMuted">ENS contract interactions</p>
        </div>
        <div className="w-28">
          <div className="text-xl font-medium text-palette-primary">{contractsDeployed}</div>
          <p className="text-xs text-palette-foregroundMuted">Smart contracts deployed</p>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
