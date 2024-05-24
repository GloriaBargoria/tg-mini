/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

interface UseFetchDataConfig<T> {
  queryKey: string;
  url: string;
  config?: AxiosRequestConfig;
  errorMessage: string;
  dependency?: boolean;
  noCache?: boolean;
  options?: UseQueryOptions<T>;
}

type UseQueryResult<TData, TError = unknown> = {
  data?: TData;
  error?: TError;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};

const usefetchData = <T = unknown>({
  queryKey,
  url,
  config,
  errorMessage,
  dependency = true,
  noCache = false,
  options,
}: UseFetchDataConfig<T>): UseQueryResult<T, unknown> => {
  const queryFunction = async (): Promise<T> => {
    const response = await axios.get<T>(url, config);
    return response.data;
  };

  const queryOptions: UseQueryOptions<T> = {
    staleTime: noCache ? 0 : 3600 * 1000,
    cacheTime: noCache ? 0 : 3600 * 1000,
    enabled: dependency,
    onError: () => {
      toast.error(errorMessage);
    },
    ...options,
  };

  const { data, isLoading, error } = useQuery<T, unknown>(
    [queryKey],
    queryFunction,
    queryOptions
  );

  const isSuccess = !!data && !error;
  const isError = !!error;

  return { data, error, isError, isLoading, isSuccess };
};

export default usefetchData;
