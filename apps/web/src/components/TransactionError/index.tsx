import { useAnalytics } from 'apps/web/contexts/Analytics';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useEffect } from 'react';
import { ContractFunctionExecutionError, TransactionExecutionError } from 'viem';

export type TransactionErrorProps = {
  error: unknown;
  className?: string;
};

export function getTransactionErrorMessage(error: unknown) {
  let errorMessage = 'unknown';

  if (error instanceof ContractFunctionExecutionError) return error.shortMessage;
  if (error instanceof TransactionExecutionError) return error.details;
  if (error instanceof Error) return error.message;

  return errorMessage;
}

// A component to display the status of a transaction (can be success or reverted)
export default function TransactionError({ error, className }: TransactionErrorProps) {
  let errorDetail = getTransactionErrorMessage(error);
  const { logEventWithContext } = useAnalytics();

  useEffect(() => {
    logEventWithContext(`show_transaction_error`, ActionType.error, {
      error: JSON.stringify(error),
    });
  }, [error, logEventWithContext]);

  return (
    <p className={classNames('text-orange-50', className)}>Transaction canceled: {errorDetail}</p>
  );
}
