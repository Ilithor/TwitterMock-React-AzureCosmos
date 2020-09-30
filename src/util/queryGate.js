import { useRef } from 'react';

export const useQueryGate = () => {
  const queryMonitor = useRef({});

  /** Checks if the provided query is allowed to execute
   *
   * @param {any} query
   * @returns {boolean}
   */
  const allowQuery = async query => {
    if (
      !queryMonitor.current[query] ||
      queryMonitor.current[query] + 600000 <= Date.now()
    ) {
      queryMonitor.current[query] = Date.now();
      return true;
    } else {
      return false;
    }
  };

  setTimeout(() => {
    console.log(queryMonitor.current);
  }, 30000);

  return {
    allowQuery,
  };
};
