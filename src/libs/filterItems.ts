export let titlePrettify = (title: string | undefined): string => {
    if (title && title.length > 0) {
        let newWord = title.replace(/-/gi, ' ')
        let result = newWord.charAt(0).toUpperCase() + newWord.slice(1)
        return result
    }
    return ''
}

const searchItems = (arrayItem: any, string: string) => {
    if(!string){
        return arrayItem
    }
    let filteredArray = arrayItem.filter((el: any) => {
        console.log(el[0], titlePrettify(el[0]), titlePrettify(string))
        if(titlePrettify(el[0]).includes(titlePrettify(string))){
            return el
        }
    })
    return filteredArray
}

export default searchItems