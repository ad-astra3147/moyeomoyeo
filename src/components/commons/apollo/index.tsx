import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { GetAccessToken } from "../../../commons/libraries/getAccessToken";
import { accessTokenState } from "../../../commons/store";
import { onError } from "@apollo/client/link/error";

export default function ApolloSetting(props: any) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  useEffect(() => {
    GetAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken);
    });
  }, []);

  const uploadLink = createUploadLink({
    uri: "https://a2af-61-43-54-3.jp.ngrok.io/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === "UNAUTHENTICATED") {
          GetAccessToken().then((newAccessToken) => {
            operation.setContext({
              ...operation.getContext().headers,
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
            return forward(operation);
          });
        }
      }
    }
  });
  const client = new ApolloClient({
    //accessToken 넣기 전까지만 여기에 uri 삽입
    uri: "https://a2af-61-43-54-3.jp.ngrok.io/graphql",
    // link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
    //connectToDevTools: true,
  });
  return (
    <>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </>
  );
}
