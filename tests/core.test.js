import {describe,expect,it,beforeAll,beforeEach,afterAll,afterEach} from "vitest";
import {createProduct, isPriceInRange, isValidUsername, validateUserInput} from "../src/core";
import {getCoupons,Stack} from "../src/core";
import {calculateDiscount,canDrive,fetchData} from "../src/core";

describe("createProduct",()=>{
    it("should return success true and message Product was successfully published",()=>{
        const result = createProduct({name:"test",price:100});
        expect(result).toEqual({
            success:true,
            message:"Product was successfully published"
        })
    })
})


describe("getCoupons",()=>{
    it("should return array of coupon object",()=>{
        const result = getCoupons();
        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toBeGreaterThanOrEqual(0);
        
    })
    it("should return valid coupon objects",()=>{
        const result = getCoupons();
        result.forEach((coupon)=>{
            expect(coupon).toHaveProperty("code");
            expect(typeof coupon.code).toBe("string")
            expect(coupon).toHaveProperty("discount");
            expect(typeof coupon.discount).toBe("number")
            expect(coupon.discount).toBeGreaterThanOrEqual(0.1)
            expect(coupon.discount).toBeLessThanOrEqual(1)
            expect(coupon.code).toBeTruthy();
        })
    })
})

describe("calculateDiscount",()=>{
    it("should return valid number if price is number and discountCode is string",()=>{
        expect(calculateDiscount(100,"SAVE10")).toBe(90);
        expect(calculateDiscount(100,"SAVE20")).toBe(80);
    })
    it("should have valid price input",()=>{
        const price = 100;
        expect(price).toBeGreaterThanOrEqual(0);
        expect(typeof price).toBe("number");
    })
    it("should have valid discount code input",()=>{
        const discountCode = "SAVE10";
        expect(discountCode).toBeTruthy();
        expect(typeof discountCode).toBe("string");
    })
    it("should handle negative price",()=>{
        expect(calculateDiscount(-10,"SAVE10")).toMatch(/invalid/i);
    })
    it("should handle non-string discount code",()=>{
        expect(calculateDiscount(100,10)).toMatch(/invalid/i);
    })
    it("should handle invalid discount code",()=>{
        expect(calculateDiscount(100,"INVALID_CODE")).toBe(100);
    })
})


describe("validateUserInput",()=>{
    it("should return validation successful of no errors",()=>{
        expect(validateUserInput("test",18)).toBe("Validation successful");
    })
    
    it("should return invalid age for age less than 18 or age is not a number",()=>{
        expect(validateUserInput("test",17)).toBe("Invalid age");
        expect(validateUserInput("test","17")).toBe("Invalid age");
    })
    it("should return invalid username for username is not a string or username is less than 3 characters",()=>{
        expect(validateUserInput(17,21)).toBe("Invalid username");
        expect(validateUserInput("te",21)).toBe("Invalid username");
    })
    it("should return both invalid username and age for both invalid username and age",()=>{
        expect(validateUserInput(17,"17")).toBe("Invalid username, Invalid age");
        expect(validateUserInput(17,"17")).toBe("Invalid username, Invalid age");
        expect(validateUserInput("te",17)).toBe("Invalid username, Invalid age");
        expect(validateUserInput("te",17)).toBe("Invalid username, Invalid age");
    })

    it("should return an error if username is longer than 255 characters",()=>{
        expect(validateUserInput("a".repeat(256),18)).toMatch(/invalid/i);

    })
    it("should return an error if age is greater than 100",()=>{
        expect(validateUserInput("abcd",101)).toMatch(/invalid/i);
    })

})


describe("isPriceInRange",()=>{
    it.each([
        {price:50,min:1,max:100,result:true,scenario:"price is within the range"},
        {price:1,min:1,max:100,result:true,scenario:"price is equal to min"},
        {price:100,min:1,max:100,result:true,scenario:"price is equal to max"},
        {price:0,min:1,max:100,result:false,scenario:"price is less than min"},
        {price:101,min:1,max:100,result:false,scenario:"price is greater than max"}
    ])
    ("should return $result for $scenario",({ price,min,max,result})=>{
        expect(isPriceInRange(price,min,max)).toBe(result);
    })
    it("should return invalid if price or min or max is not a number",()=>{
        expect(isPriceInRange("a",1,100)).toMatch(/invalid/i);
        expect(isPriceInRange(1,"a",100)).toMatch(/invalid/i);
        expect(isPriceInRange(1,1,"a")).toMatch(/invalid/i);
    })
    it("should return invalid if min is greater than max",()=>{
        expect(isPriceInRange(50,100,1)).toMatch(/invalid/i);
    })
})

describe("isValidUsername",()=>{
    it("should return true if username length is valid",()=>{
        expect(isValidUsername("yash0632")).toBe(true);
        expect(isValidUsername("yogender31")).toBe(true);
    })
    it("should return false if username length is less than minLength",()=>{
        expect(isValidUsername("y")).toBe(false);
    })
    it("should return false if username length is greater than maxLength",()=>{
        expect(isValidUsername("a".repeat(16))).toBe(false);
    })
    it("should return invalid Username if username is not string",()=>{
        expect(isValidUsername(123)).toMatch(/invalid/i);
    })
    it("should return false if username does not have starting character as alphabet",()=>{
        expect(isValidUsername("12345")).toMatch(/invalid/i);
        expect(isValidUsername("_asvd2342")).toMatch(/invalid/i)
    })
    it("should return invalid username if username is null or undefined",()=>{
        expect(isValidUsername(null)).toMatch(/invalid/i)
        expect(isValidUsername(undefined)).toMatch(/invalid/i)
    })
})

describe("canDrive",()=>{
    it("should return invalid if countryCode is not US or UK",()=>{
        expect(canDrive(18,"NA")).toMatch(/invalid/i);
    })
    it("should return invalid if age is not a number",()=>{
        expect(canDrive("18","US")).toMatch(/invalid/i);
    })
    it("should return invalid if countryCode is not a string",()=>{
        expect(canDrive(18,123)).toMatch(/invalid/i);
    })

    it.each([
        {age:15,countryCode:"US",result:false},
        {age:16,countryCode:"UK",result:false},
        {age:16,countryCode:"US",result:true},
        {age:17,countryCode:"UK",result:true},
        {age:18,countryCode:"US",result:true},
        {age:18,countryCode:"UK",result:true},
        {age:19,countryCode:"US",result:true},
        {age:19,countryCode:"UK",result:true}
        
    ])
    ("should return $result for ($age,$countryCode)",({  age,countryCode,result})=>{
        expect(canDrive(age,countryCode)).toBe(result);
    })
})

describe("fetchData",()=>{
    it("should return [1,2,3]",async()=>{
        const result = await fetchData();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(3); 
        expect(result).toEqual([1,2,3]);
    })
    it("should return error",async()=>{
        try{
            const result = await fetchData();
        }
        catch(error){
            expect(error).toHaveProperty("reason");
            expect(error.reason).toMatch(/fail/i);
        }
    })
})

// describe('test suite',()=>{
    
//     beforeEach(()=>{
//         console.log("before Each called")
//     })
//     beforeAll(()=>{
//         console.log('before All called')
//     })
//     afterEach(()=>{
//         console.log("after Each called")
//     })
//     afterAll(()=>{
//         console.log("after All called")
//     })
//     it('test case 1',()=>{
//         console.log("test case 1 called")
//     })
//     it('test case 2',()=>{
//         console.log("test case 2 called")
//     })
// })

describe('stack',()=>{
    let stack;
    beforeEach(()=>{
        stack = new Stack();
    })

    it("should have an items property",()=>{
        expect(stack).toHaveProperty("items");
    })

    it("should have items as an array",()=>{
        expect(Array.isArray(stack.items)).toBe(true);
    })

    it("should push an item into items",()=>{
        stack.push(1);
        expect(stack.items).toEqual([1]);
        expect(stack.items.length).toBe(1);
        stack.push(2);
        expect(stack.items).toEqual([1,2]);
        expect(stack.items.length).toBe(2);
    })

    it("should return empty if stack is empty",()=>{
        expect(() => stack.pop()).toThrow("Stack is empty");
    })

    it("should remove element on pop",()=>{
        stack.push(1);
        stack.push(2);
        expect(stack.pop()).toBe(2);
        expect(stack.items).toEqual([1]);
        expect(stack.items.length).toBe(1);
        expect(stack.pop()).toBe(1);
        expect(stack.items).toEqual([]);
        expect(stack.items.length).toBe(0);
    })

    it("should return top element if stack size greater than 0",()=>{
        stack.push(1);
        stack.push(2);
        expect(stack.peek()).toBe(2);
        stack.pop();
        expect(stack.peek()).toBe(1);
        stack.pop();
        expect(()=>stack.peek()).toThrow("Stack is empty");
    })

    it("should return isEmpty as true if stack is empty otherwise false",()=>{
        expect(stack.isEmpty()).toBe(true);
        stack.push(1);
        expect(stack.isEmpty()).toBe(false);
        stack.pop();
        expect(stack.isEmpty()).toBe(true);
    })

   it("should return size of stack",()=>{
        expect(stack.size()).toBe(0);
        stack.push(1);
        expect(stack.size()).toBe(1);
        stack.push(2);
        expect(stack.size()).toBe(2);
        stack.pop();
        expect(stack.size()).toBe(1);
        stack.pop();
        expect(stack.size()).toBe(0);
   })

   it("should return clear of stack",()=>{
        stack.push(1);
        stack.push(2);
        stack.clear();
        expect(stack.size()).toBe(0);
   })

})