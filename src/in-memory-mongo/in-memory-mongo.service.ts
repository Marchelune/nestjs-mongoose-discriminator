import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Injectable()
export class InMemoryMongoService implements OnApplicationShutdown {
    private readonly mongodb: MongoMemoryServer;

    constructor() {
        this.mongodb = new MongoMemoryServer();
    }

    public async getMongoConnString(): Promise<string> {
        return await this.mongodb.getUri();
    }

    public async onApplicationShutdown(): Promise<void> {
        await this.mongodb.stop();
    }
}
