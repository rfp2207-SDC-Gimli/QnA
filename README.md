# E-commerce System Design
Inherited a front-end e-commerce application. In this project I built and optimized a back-end API for an e-commerce application. I worked I with over 12 million data entries regarding questions and answers for products.
## Tech Stack
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
### Testing
[Loader.io](https://loader.io/)
</br>
[k6](https://k6.io/docs/)

## Project Description
### Goal
| Throughput|  Latency  | Error rate|
|-----------|-----------|-----------|
| 1,000 rps |  <= 50ms  |   < 1%    |

### Data Transfer
The questions and answers data has over 12 million data entries. I transferred the data from a csv file into a postgreSQL database by performing an ETL process.

### Deployment
Deployed the server and database to AWS, I used a EC2 T2 micro instance for my server. I stress tested using Loader.io, and took the average of three test with randomized product ID.
| Throughput|  Latency  | Error rate|
|-----------|-----------|-----------|
| 1,000 rps |  1,200ms  |    32%    |

### Load Balancer
I scaled horizontally and deployed another server. Then, I used Nginx as my load balancer.
| Throughput|  Latency  | Error rate|
|-----------|-----------|-----------|
| 1,000 rps |   312ms   |     6%    |

### Least Connection
Switched to least connection load balancing from round robin load balancing in Nginx.
| Throughput|  Latency  | Error rate|
|-----------|-----------|-----------|
| 1,000 rps |    6ms    |     0%    |

### Content Caching
Performed content caching in load balancer.
| Throughput|  Latency  | Error rate|
|-----------|-----------|-----------|
| 1,000 rps |   1.66ms  |   0.16%   |

### Final Result
Increased throughput to 5,000 rps.
| Throughput|  Latency  | Error rate|
|-----------|-----------|-----------|
| 5,000 rps |    3ms    |     0%    |

## Installation and Usage
Ensure postgreSQL is in your computer
</br>
Copy `example.env` file and rename to `.env`, then fill in the variables
```
npm install
```
```
npm run server-dev
```
