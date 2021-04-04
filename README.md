# Raiffeisen test: Url shortener

Необходимо написать сервис сокращения ссылок.

#### Требования:

- [ ] Общение с сервисом должно проходить через интерфейс HTTP;
- [ ] Сокращённую ссылку хранить в базе;
- [ ] Методы сервиса должны быть идемпотентны, то есть для одной и той же ссылки не может прийти два разных сокращённых варианта;
- [ ] При переходе по сокращённой ссылке делать редирект, если сокращённый вариант ссылки не найден у нас в базе, то возвращать 404 ошибку;
- [ ] Сохранять количество переходов по сокращённой ссылке.

#### Технические требования:

- [ ] node.js >= 12;
- [ ] TypeScript;
- [ ] Можно использовать любой фреймворк на выбор – fastify, express, Inversify, NestJS;
- [ ] БД – любая, предпочтительно Postgres;
- [ ] Написать юнит тесты;
- [ ] Обернуть сервис в docker, чтобы запускался в docker-compose;
- [ ] (Опционально) написать E2E тесты;
- [ ] (Опционально) добавить кэширование(in-memory/redis – любое на выбор).

Оформленный код выложить на github. Написать readme для запуска сервиса и теста/тестов.