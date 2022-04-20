// export function debounce(f, ms) {
//
//     let isCooldown = false;
//
//     return function() {
//         if (isCooldown) return;
//
//         f.apply(this, arguments);
//
//         isCooldown = true;
//
//         setTimeout(() => isCooldown = false, ms);
//     };
//
// }

export function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}