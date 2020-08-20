import fetchMock from 'fetch-mock';

const nodeFetch = jest.requireActual('node-fetch');
const fetch = fetchMock.sandbox();
Object.assign(fetch.config, {
  fetch: nodeFetch,
});
return fetch;
