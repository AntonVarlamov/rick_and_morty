export const getEpisodes = (arr) =>{
    let res = [];
    let l = +arr[0].match(/\d+$/);
    let r = l;
    for (let i = 1; i < arr.length; i++) {
        let cur = +arr[i].match(/\d+$/);
        if(cur - r === 1){
            r = cur;
        } else {
            if(r === l){
                res.push(l)
            } else {
                res.push(`${l}-${r}`)
            }
            i++;
            if(i >= arr.length){
                break
            }
            cur = +arr[i].match(/\d+$/);
            l = r = cur;
        }
    }
    if(l === r){
        res.push(l)
    } else {
        res.push(`${l}-${r}`)
    }
    return res.join(', ')
}

