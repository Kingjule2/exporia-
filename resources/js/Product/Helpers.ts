export const arraysAreEqual = (arry1: any[], arry2: any[]) => {
    if (arry1.length !== arry2.length) return false;

    return arry1.every((value, index) => value === arry2[index]);
}
