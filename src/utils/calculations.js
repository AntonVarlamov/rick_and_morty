export const getNumberEpisodes = (arrOfUrlCharacters) => {
    let res = [];
    let left = +arrOfUrlCharacters[0].match(/\d+$/);
    let right = left;
    for (let i = 1; i < arrOfUrlCharacters.length; i++) {
        let cur = +arrOfUrlCharacters[i].match(/\d+$/);
        if (cur - right === 1) {
            right = cur;
        } else {
            if (right === left) {
                res.push(right)
            } else {
                res.push(`${left}-${right}`)
            }
            left = right = cur
            if (!arrOfUrlCharacters[i]) {
                break
            }
            cur = +arrOfUrlCharacters[i].match(/\d+$/);
            right = cur;
        }
    }
    if (left === right) {
        res.push(right)
    } else {
        res.push(`${left}-${right}`)
    }
    return res.join(', ')
}

export const parseCharacters = arr => {
    arr = arr.map(item => item.name)
    return arr.length > 15
        ? arr.slice(0, 16).join(", ") + " и др."
        : arr.join(", ")
}

export const getIdFromUrl = arr => {
    return (arr ?? []).map(url => {
        return +url.match(/\d+$/)
    })
}

export const getTotalPages = arrFavourites => {
    return Math.trunc(arrFavourites.length / 20) + Math.ceil(arrFavourites.length % 20 / 20)
}
