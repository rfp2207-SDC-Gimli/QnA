import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

export default function () {

  const url = http.get('http://localhost:4000/qa/questions?product_id=1');

  check(url, {
    'status is 200': (r) => r.status == 200,
  }) || errorRate.add(1);

  sleep(1);

}
