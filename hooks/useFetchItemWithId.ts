"use client";

import { useState, useEffect, useCallback } from "react";

interface Props<T> {
  fetchFunction: (id: string) => Promise<T | null>;
  id: string;
}

export interface UseFetchItemWithIdResult<T> {
  data: T | undefined;
  fetchItem: () => Promise<void>;
  id: string;
}

export const useFetchItemWithId = <T>({
  fetchFunction,
  id,
}: Props<T>): UseFetchItemWithIdResult<T> => {
  const [data, setData] = useState<T>();

  const fetchItem = useCallback(async () => {
    try {
      const fetchData = await fetchFunction(id);

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
  }, [fetchFunction, id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  return {
    data,
    fetchItem,
    id,
  };
};
