let data: number | string;

data = '21'; 

export interface ICar {
    color: string;
    model: string;
    topSpeed?: number;
}

const car1: ICar = {
    color: 'blue',
    model: 'BWM'
}

const car2: ICar = {
    color: 'red',
    model: 'Mercedes',
    topSpeed: 100
}

const multiply = (x:number, y:number) => {
    x*y
}

export const cars = [car1, car2]