import amqp from 'amqplib/callback_api';

amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        throw connError;
    }
    connection.createChannel((chanError, channel) => {
        if (chanError) {
          throw chanError;
        }
        const queue: string = 'task_queue'
        const message = process.argv.slice(2).join(' ') || "Hello World!";

        channel.assertQueue(queue, {
            durable: true, 
        })

        channel.sendToQueue(queue, Buffer.from(message), {
            persistent: true
        })
        console.log('[x] Sent %s', message);
        })
        setTimeout(() => {
            connection.close()
            process.exit(0)
        }, 500)
});