import { vi,describe,it,expect } from "vitest";

describe('test suite',()=>{
    it('test case',()=>{
        //mockReturnValue
        //mockResolvedValue
        //mockImplementation
        const greet =vi.fn();
        greet.mockImplementation(name => `Hello ${name}`);
        const result= greet('yash');
        
        expect(greet).toHaveBeenCalledOnce();
    })
    it("test case 2",()=>{
        const sendText=vi.fn();
        sendText.mockReturnValue('ok');
        const result=sendText('message');
        expect(sendText).toHaveBeenCalledWith('message')
        expect(result).toBe('ok');
    })
})


