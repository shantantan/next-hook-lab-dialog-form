"use client";

import { useState, useEffect, useCallback } from "react";

interface Props<T> {
  fetchFunction: () => Promise<T | null>;
}

export interface UseFetchItemResult<T> {
  data: T | undefined;
  fetchItem: () => Promise<void>;
}

export const useFetchItem = <T>({
  fetchFunction,
}: Props<T>): UseFetchItemResult<T> => {
  const [data, setData] = useState<T>();

  const fetchItem = useCallback(async () => {
    try {
      const fetchData = await fetchFunction();

      if (!fetchData) {
        return;
      }

      setData(fetchData);
    } catch (error) {
      /**
       * 開発時にはコンソールに出力すること
       * 運用時にはクライアントに表示する、もしくはバックエンドにログを送信して記録する
       */
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  return {
    data,
    fetchItem,
  };
};
