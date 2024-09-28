## Telegram Notify

A simple implementation of the bot [@notifier_example_bot](https://t.me/smarenkov_notifie_bot).

This bot jumps into action as soon as a "user_created" event hits RabbitMQ, instantly sending out slick notifications about newly registered users.

This bot works hand-in-hand with another service that sends the "user_created" events. You can find that repo here: [NestJS example](https://github.com/smarenkov/nestjs_example)