import { createClient } from "redis";

const client = createClient();

async function main() {
    try {
        await client.connect();
        console.log("Connected to Redis");
    } catch (err) {
        console.error("Error connecting to Redis:", err);
        return;
    }

    while (true) {
        try {
            const submission = await client.brPop("submissions", 0);
            if (submission) {
                const parsedSubmission = submission
                console.log(parsedSubmission);
                
                
            }
        } catch (err) {
            console.error("Error fetching submission:", err);
            break;
        }
    }
}

main().catch((err) => {
    console.error("Unexpected error:", err);
    client.disconnect(); // Clean up the Redis connection if main fails
});
