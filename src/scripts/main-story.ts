import { IComment } from "../components/members/1"

export const getRandom = (arr: IComment[]) => {
  const indexs: number[] = [];
  const max = Math.min(3, arr.length);
  while(indexs.length < max) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if(!indexs.includes(randomIndex)){
      indexs.push(randomIndex);
    }
  }
  return indexs
  // return indexs.map((index) => {(arr[index]).comment, (arr[index]).cid});
}

export const clearArr = (arr: IComment[]) => {
  while(arr.length>0){
    arr.pop();
  }
  return arr;
}