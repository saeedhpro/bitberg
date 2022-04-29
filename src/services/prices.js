export function getPriceList() {
    return fetch("https://panel.skybitex.com/api/prices")
        .then(res => res.json())
}