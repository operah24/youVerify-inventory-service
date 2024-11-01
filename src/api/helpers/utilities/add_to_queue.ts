import amqp from "amqplib";

const url = process.env.RABBITMQ_URI as string;

export async function addToQueue(queue: string, data: any) {
 try {
  const body = JSON.stringify(data);
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();

  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(body));

  console.log(`Sent: ${body}`);
  
  setTimeout(() => {
    connection.close();
  }, 500);
 } catch (error) {
  console.log(error)
 }
}

