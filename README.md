## Telegram Notify

A simple implementation of the bot [@notifier_example_bot](https://t.me/smarenkov_notifie_bot).

This bot jumps into action as soon as a `user_created` event hits RabbitMQ, instantly sending out slick notifications about newly registered users.

This bot works hand-in-hand with another service that sends the `user_created` events. You can find that repo here: [NestJS example](https://github.com/smarenkov/nestjs_example)

### How to Launch

**Create a `.env` file in the root directory**

In the root of your project directory, create a .env file with the following content:

```env
TELEGRAM_BOT_TOKEN=your telegram bot token
MONGODB_URL=your mongo url
RABBITMQ_URL=your rabbit url
RABBITMQ_USERS_QUEUE=users_queue
```

### Running Docker Compose with Local MongoDB

If you want to run Docker Compose and use your local MongoDB, you'll need to modify the MongoDB configuration to allow external connections.

1. Open the MongoDB configuration file `mongod.conf`.

2. Edit the following line to enable connections from any IP address:

```yaml
net:
  # Other configurations...
  
  # Enable connection from any IP address
  bindIp: 0.0.0.0
```

### Running Docker Compose with Local RabbitMQ

If you want to run Docker Compose and use your local RabbitMQ instance, you'll need to modify the RabbitMQ configuration to specify the IP address.

1. Open the RabbitMQ configuration file `rabbitmq.conf`. If it doesn't exist, create it in the RabbitMQ directory `/etc/rabbitmq/`.

2. Add the following line to specify the IP address:

```
listeners.tcp.default = [your ip address]:5672
```