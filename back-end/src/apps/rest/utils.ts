const AUTH_HEADER = 'authorization';
const parseAuthHeader = (
    header: string,
): { scheme: string; value: string } | null => {
    if (typeof header !== 'string') {
        return null;
    }
    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }
    return { scheme: parts[0], value: parts[1] };
};
export const extractTokenFromHeader = (request: Request): string | null => {
    let token: string | null = null;
    if (request.headers[AUTH_HEADER]) {
        const auth_params = parseAuthHeader(request.headers[AUTH_HEADER]);
        if (auth_params && 'bearer' === auth_params.scheme.toLowerCase()) {
            token = auth_params.value;
        }
    }
    return token;
};
