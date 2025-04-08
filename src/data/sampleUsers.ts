import { TUser } from "../types/User";

export const generateSampleUsers = (count: number): TUser[] => {
	const users: TUser[] = [];
	for (let i = 0; i < count; i++) {
		users.push({
			id: i.toString(),
			name: `User ${i + 1}`,
			balance: Math.floor(Math.random() * 10000),
			email: `user${i + 1}@example.com`,
			registerAt: new Date(Date.now() - Math.random() * 1e10),
			active: Math.random() > 0.5,
		});
	}
	return users;
};
