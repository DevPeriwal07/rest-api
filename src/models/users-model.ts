import { readFile, writeFile } from 'node:fs/promises';

export type User = {
  id: string;
  name: string;
  createdAt: Date;
};

class UserModel {
  private entries: User[] = [];

  public get(id: string): User | undefined {
    return this.entries.find((user) => user.id === id);
  }

  public async create(data: User): Promise<boolean> {
    if (this.get(data.id)) {
      return false;
    }

    this.entries.push(data);
    await this.save();

    return true;
  }

  public async update(id: string, data: Partial<User>): Promise<boolean> {
    const index = this.entries.findIndex((user) => user.id === id);

    if (index === -1) return false;

    this.entries[index] = {
      ...this.entries[index],
      ...data,
    };

    await this.save();
    return true;
  }

  public async delete(id: string): Promise<boolean> {
    const index = this.entries.findIndex((user) => user.id === id);

    if (index === -1) return false;

    this.entries.splice(index, 1);

    await this.save();

    return true;
  }

  private async save(): Promise<void> {
    const data = JSON.stringify(this.entries);

    try {
      await writeFile('./data.json', data, 'utf8');
    } catch (err: unknown) {
      console.error('[ERROR] Failed to save data');

      if (err instanceof Error) {
        console.error(err.message);
      }

      throw err;
    }
  }

  public async load(): Promise<void> {
    try {
      const data = await readFile('./data.json', 'utf8');

      const users = JSON.parse(data) as Array<User>;

      this.entries = users.map((user) => ({
        ...user,
        createdAt: new Date(user.createdAt),
      }));
    } catch (err: unknown) {
      // File doesn't exist yet
      if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
        this.entries = [];
        return;
      }

      throw err;
    }
  }
}

export const userModel = new UserModel();
