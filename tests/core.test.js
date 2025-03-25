import {describe,expect,it} from "vitest";
import {createProduct, isPriceInRange, isValidUsername, validateUserInput} from "../src/core";
import {getCoupons} from "../src/core";
import {calculateDiscount} from "../src/core";

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
    it("should return 1 if price is between or equal to min and max",()=>{
        expect(isPriceInRange(50,1,100)).toBe(true);
        expect(isPriceInRange(1,1,100)).toBe(true);
        expect(isPriceInRange(100,1,100)).toBe(true);
    })
    it("should return false is price less than min",()=>{
        expect(isPriceInRange(0,1,100)).toBe(false);
    })
    it("should return false if price bigger than max",()=>{
        expect(isPriceInRange(101,1,100)).toBe(false);
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