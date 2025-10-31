export const flushPromises = async () => new Promise(setImmediate);

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
