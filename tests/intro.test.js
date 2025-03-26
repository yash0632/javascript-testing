import {describe,test,it,expect} from "vitest";
import {max,fizzBuzz,calculateAverage,calculateFactorial} from "../src/intro";

describe('max',()=>{
    it('should return the first argument if it is greater',()=>{
        expect(max(2,1)).toBe(2);
    })

    it('should return the second argrument if it is greater',()=>{
        expect(max(4,5)).toBe(5);
    })

    it('should expect any arguments if they are equal',()=>{
        expect(max(4,4)).toBe(4);
    })
})

describe("fizzBuzz",()=>{
    it("should return FizzBuzz if the number is divisible by 3 and 5",()=>{
        const result = fizzBuzz(15);
        expect(result).toBe("FizzBuzz");
    })

    it("should return Fizz if the number is divisible by 3",()=>{
        const result = fizzBuzz(6);
        expect(result).toBe("Fizz!");
    })

    it("should return Buzz if the number is divisible by 5",()=>{
        expect(fizzBuzz(25)).toBe("Buzz");
    })

    it("should return the number as a string if number not divisible by 3 and 5",()=>{
        expect(fizzBuzz(16)).toBe("16");
    })
})

describe("calculateAverage",()=>{
    it("should return the average of the array",()=>{
        expect(calculateAverage([1,2,3,4,5])).toBe(3);
        expect(calculateAverage([1,2,3,4,5,6,7,8,9,10])).toBe(5.5);
        expect(calculateAverage([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])).toBe(10.5);
        expect(calculateAverage([-1,-2,-3,-4,-5])).toBe(-3);
    })

    it("should return NaN if array is empty",()=>{
        expect(calculateAverage([])).toBe(NaN);
    })
})


describe("calculateFactorial",()=>{
    it("should return the factorial of a number",()=>{
        expect(calculateFactorial(5)).toBe(120)
        expect(calculateFactorial(6)).toBe(720)
    })
    it("should return 1 if the number is 1",()=>{
        expect(calculateFactorial(1)).toBe(1)
    })
    it("should return 1 if the number is 0",()=>{
        expect(calculateFactorial(0)).toBe(1)
    })
    it("should return undefined if the number is less than 0",()=>{
        expect(calculateFactorial(-1)).toBe(undefined)
    })
    it("should return undefined if the number is floating point",()=>{
        expect(calculateFactorial(2.5)).toBe(undefined)
    })
}) 