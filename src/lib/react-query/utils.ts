import type { UseQueryOptions } from "@tanstack/react-query";
import {
  isServer,
  QueryClient,
  useQuery as useQueryTanstack,
  type QueryClientConfig,
} from "@tanstack/react-query";

function makeQueryClient(config?: QueryClientConfig) {
  return new QueryClient(config);
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // 서버: 항상 새로운 query client를 만듭니다
    return makeQueryClient({
      defaultOptions: {
        queries: {
          // SSR에서는 일반적으로 클라이언트에서 즉시 리페칭을
          // 피하기 위해 기본 staleTime을 0보다 높게 설정
          staleTime: 60 * 1000,
          retry: false,
        },
      },
    });
  } else {
    // 브라우저: 이미 query client가 없다면 새로 만듭니다
    // 이는 매우 중요합니다. React가 초기 렌더링 중에 일시 중단되고
    // query client 생성 아래에 suspense 경계가 없는 경우
    // 새 클라이언트를 다시 만들지 않도록 하기 위함입니다
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: false,
          },
        },
      });
    }
    return browserQueryClient;
  }
}

export function useQuery<T>(options: UseQueryOptions<T>) {
  const query = useQueryTanstack<T>(options);
  return query.data;
}
