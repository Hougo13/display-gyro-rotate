export function to360(value: number): number {
    return value >= 0 ? value : value + 360;
}

export function fromZero(value: number, zeroValue: number): number {
    return to360(value - zeroValue);
}

export function invert(value: number, inverted: boolean): number {
    return inverted ? 360 - value : value;
}

export function nicer(
    value: number,
    zeroValue: number,
    inverted: boolean
): number {
    return invert(fromZero(value, zeroValue), inverted);
}
