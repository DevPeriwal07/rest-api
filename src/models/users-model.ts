export type User = {
  id: string;
  name: string;
  createdAt: Date;
};

class UserModel {
  private entries: User[];

  constructor() {
    this.entries = [];
  }

  public get(id: string) {
    return this.entries.find((entry) => entry.id === id);
  }

  public create(data: User) {
    this.entries.push(data);
  }

  public update(id: string, data: Partial<User>): boolean {
    const index = this.entries.findIndex((entry) => entry.id === id);

    if (index == -1) return false;

    const entry = this.entries[index];

    this.entries[index] = {
      ...entry,
      ...data,
    };

    return true;
  }

  public delete(id: string): boolean {
    const index = this.entries.findIndex((entry) => entry.id === id);

    if (index == -1) return false;

    this.entries.splice(index, 1);
    return true;
  }
}

export const userModel = new UserModel();
