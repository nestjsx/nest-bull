import { Job, Worker } from 'bullmq';

export abstract class WorkerHost<T extends Worker = Worker> {
  private readonly _worker: T | undefined;

  get worker(): T {
    if (!this._worker) {
      throw new Error(
        '"Worker" has not yet been initialized. Make sure to interact with worker instances after the "onModuleInit" lifecycle hook is triggered for example, in the "onApplicationBootstrap" hook, or if "manualRegistration" is set to true make sure to call "BullRegistrar.register()"',
      );
    }
    return this._worker;
  }

  abstract process(job: Job, token?: string): Promise<any>;
}
