function redirect(relativeUrl: string): void {
    console.log("redirect")
    window.location.href = relativeUrl;
}

function getQueryParameter(name: string): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

const utils = {
    redirect,
    getQueryParameter
}

export default utils;

export type JsMap<K extends string, V> = { [key in K]: V; };
