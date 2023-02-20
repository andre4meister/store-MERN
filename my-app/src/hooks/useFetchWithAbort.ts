import { useEffect } from 'react';
import { useAppDispatch } from './redux';

export const useFetchWithAbort = (fetchRequest: any, requestData: any) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRequest(requestData, signal));

    return () => {
      controller.abort();
    };
  }, []);
};
