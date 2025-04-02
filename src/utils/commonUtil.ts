export const generateUsername = (name: string) => {
	return name.replace(/\s+/g, '_').toLowerCase();
};
