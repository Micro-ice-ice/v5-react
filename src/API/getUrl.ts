const getWebSocketUrl = (): string => {
    const protocol = location.protocol.startsWith('https') ? 'wss://' : 'ws://';
    const host = location.host;

    return `${protocol}${host}`;
};

export default getWebSocketUrl;
