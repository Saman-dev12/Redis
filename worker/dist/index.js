"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to Redis");
        }
        catch (err) {
            console.error("Error connecting to Redis:", err);
            return;
        }
        while (true) {
            try {
                const submission = yield client.brPop("submissions", 0);
                if (submission) {
                    const parsedSubmission = submission;
                    console.log(parsedSubmission);
                }
            }
            catch (err) {
                console.error("Error fetching submission:", err);
                break;
            }
        }
    });
}
main().catch((err) => {
    console.error("Unexpected error:", err);
    client.disconnect(); // Clean up the Redis connection if main fails
});