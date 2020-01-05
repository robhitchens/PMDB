export default interface ScheduledPersistence{

    pollCache(): void;
    writeCacheToPersistence(): Promise<void>;
}