import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '15s', target: 250 },
    { duration: '30s', target: 250 },
    { duration: '15s', target: 500 },
    { duration: '30s', target: 500 },
    { duration: '15s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '60s', target: 0 },
  ]
};

export default function () {

  let id = Math.floor(Math.random() * 99999);

  const BASE_URL = 'http://localhost:4000/qa/questions';

  const responses = http.batch([
    ['GET', `${BASE_URL}?product_id=${id}`],
    ['GET', `${BASE_URL}?product_id=${id}`],
    ['GET', `${BASE_URL}?product_id=${id}`],
    ['GET', `${BASE_URL}?product_id=${id}`],
  ]);

  sleep(1);
}
