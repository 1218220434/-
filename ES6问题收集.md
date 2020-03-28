# ES6收集

> ### flat方法
>
> const newArr = oldArr.flat(Infinity);
>
> 可以用于降维数组，不管几维
>
> 穿参数传1就代表拉平一层，传Infinity代表全部拉平

> ### flatMap方法(map方法的ES6写法)
>
> const arr = [1, 2, 3, 4];
>
> arr.flatMap(x => x * 2);
> *// [2, 4, 6, 8]*
>
> *arr.flatMap(**x* *=>* *[[x ** *2**]])*
> *// [[2], [4], [6], [8]]*