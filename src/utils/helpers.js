export const twoObjMerging = (obj1, obj2) => {
    let newObj = obj1;
    Object.entries(obj1._doc).map((elem) => {
        if (obj2.hasOwnProperty(elem[0])) {
            Object.entries(elem[1]).map((subElem) => {
                newObj[`${elem[0]}`][`${subElem[0]}`] = obj2[`${elem[0]}`].includes(subElem[0])
            })
        }
    })

    delete newObj._doc._id;

    return newObj;
}