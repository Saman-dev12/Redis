import { createClient, RedisClientType } from "redis";
export class PubSubManager {
    private static instance: PubSubManager;
    private subscribers: Map<string, string[]>;
    private client: RedisClientType;
    private subClient: RedisClientType;

    private constructor() {
        this.subscribers = new Map<string, string[]>();
        this.client = createClient({
            url: "http://localhost:6379"
        });
        this.subClient = createClient({
            url: "http://localhost:6379"
        });
    }

    public static getInstance(): PubSubManager {
        if (!this.instance) {
            this.instance = new PubSubManager();
        }
        return this.instance;
    }

    public sub(event: string, userId: string): void {
        if (this.subscribers.has(event)) {
            let subscribers = this.subscribers.get(event);
            if (subscribers) {
                subscribers.push(userId);
                this.subClient.subscribe(event, (message) => {
                    console.log(message);
                });
            }
        } else {
            this.subscribers.set(event, [userId]);
        }
    }

    public pub(event: string, message: string): void {
        if (!this.subscribers.has(event)) {
            throw new Error("No subscribers for this event");
        }
        if (this.subscribers.get(event)?.length === 0) {
            throw new Error("No subscribers for this event");
        }
        this.client.publish(event, message);
    }
}

export default PubSubManager.getInstance();