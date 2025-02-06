export interface User {
    id: string;
    username: string;
    password: string;
    role: 'admin' | 'recruiter' | 'candidate';
    createdAt: Date;
    updatedAt: Date;
}

export class UserModel {
    private users: User[] = [];

    public createUser(user: User): User {
        this.users.push(user);
        return user;
    }

    public getUserById(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }

    public updateUser(id: string, updatedUser: Partial<User>): User | undefined {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
            return this.users[userIndex];
        }
        return undefined;
    }

    public deleteUser(id: string): boolean {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }

    public getAllUsers(): User[] {
        return this.users;
    }
}