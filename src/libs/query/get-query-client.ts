import {
  isServer,
  QueryClient,
  // defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

const STALE_TIME = 60 * 1000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 60초 동안 fresh 상태 유지
        // 이 시간 동안에는 쿼리가 자동으로 다시 fetch되지 않음
        staleTime: STALE_TIME,
        refetchOnWindowFocus: false,
        retry: false,
        throwOnError: true,
      },
      // 탈수(dehydrate)는 서버에서 데이터를 미리 가져와 React Query의 캐시에 저장하고,
      // 클라이언트로 이 캐시를 전달하여 초기 데이터를 빠르게 로드할 수 있게 만드는 과정
      // dehydrate: {
      // 서버에서 React Query 캐시를 탈수(dehydrate)할 때 쿼리를 포함할 조건
      // - '성공(success)' 상태의 쿼리
      // - '대기 중(pending)' 상태의 쿼리도 탈수에 포함
      // shouldDehydrateQuery: (query) =>
      //   defaultShouldDehydrateQuery(query) ||
      //   query.state.status === "pending",
      // },
    },
  });
}

let browserQueryClient: QueryClient | null = null;

export default function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
