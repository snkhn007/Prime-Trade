## Scalability Notes

### Current Architecture
Monolithic Express app with MVC-style folder structure.

### Scaling Strategy
- **Microservices**: Auth, Tasks, and Admin can be split into 
  separate services communicating via REST or message queues.
- **Caching**: Redis can cache frequent reads like user sessions 
  and task lists to reduce DB load.
- **Load Balancing**: Multiple Node.js instances behind an 
  Nginx load balancer for horizontal scaling.
- **Docker**: Each service can be containerized for consistent 
  deployment across environments.
- **Rate Limiting**: express-rate-limit can prevent API abuse.