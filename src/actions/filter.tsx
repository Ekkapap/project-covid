interface RequestType {
    CHANGWAT: string;
    AMPUR: string;
    TAMBON: string;
    HOSPITAL: string;
}

export function action(type: string, payload = {}) {
    return { type, ...payload };
}

export function createFilterType(): RequestType {
    return {
        CHANGWAT: `SET_CHANGWAT`,
        AMPUR: `SET_AMPUR`,
        TAMBON: `SET_TAMBON`,
        HOSPITAL: `SET_HOSPITAL`,
    };
}
